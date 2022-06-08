import { Component, ContextType, useEffect, useLayoutEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import AppContext, { AppContextType, useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import Avatar from '../components/Avatar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatChannel from '../components/chat/ChatChannel';

const GLOBAL_MAX_PING: number = 0;

const InviteMessage = (props: any) => {
	return <></>
}

const ChatInviteButton = (props: any) => {
	return <button>+</button>
}

const Chat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	let [channels, setChannels] = useState<any[]>([]);
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState<string>("");
	let {slug} = useParams();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (value.length < 1 || value.length > 255 || value.match(/^\s+$/))
			return;
		socket.emit("msg", "chat", slug, {
			sender_id: session.get("id"),
			sender_username: session.get("username"),
			channel_slug: slug,
			type: "text",
			value: value,
			updated_at: new Date().toISOString()
		})
		setValue("")
	}

	const setupChannels = async () => {
		//setTimeout(async () => {
			const res = await fetch(`http://c2r2p3.42nice.fr:3030/users/${session.get("id")}/channels`, {
				method: "GET",
				headers: {
					'Authorization': `Bearer ${session.get("request_token")}`,
					"Content-Type": "application/json"
				},
			});
			const data = await res.json();
			setChannels(data);
		//}, GLOBAL_MAX_PING)
	}

	const setupMessages = async (chan_slug: string | undefined) => {
		if (!chan_slug || !slug || chan_slug != slug) return;
		//setTimeout(async () => {
			const res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${chan_slug}`, {
				method: "GET",
				headers: {
					'Authorization': `Bearer ${session.get("request_token")}`
				},
			});
			const data = await res.json();
			setMessages(data);
		//}, GLOBAL_MAX_PING)
	}

	useEffect(() => {
		if (socket.ready)
		{
			socket.emit("join", "chat", slug, {})
			socket.on("chat.msg", (res: any) => setupMessages(res.channel_slug));
			socket.on("chat.join", (res: any) => setupChannels());
			setupChannels();
			setupMessages(slug);
		}
		return () => { socket.emit("leave", "chat", slug, {}) }
	}, [socket.ready, slug]);

	return <section className={styles.chat}>
		<div className={styles.chat_header}>
			<div className={styles.chat_header_left}>
				<Link to="/chat/create">Nouvelle discussion</Link>
			</div>
			<div className={styles.chat_header_right}>
				<button>Options</button>
			</div>
		</div>
		<ul className={styles.chat_index}>
			{channels && channels.map((channel: any, i: number) => {
				return <ChatChannel key={i} channel={channel} />
			})}
		</ul>
		<div className={styles.chat_content}>
			<ul className={styles.chat_messages}>
				{messages && messages.map((message: any, index: number) => {
					let props = { key: index, ...message};
					if (message.type === "text")
						return <ChatMessage {...props}/>
					return <InviteMessage {...props}/>
				})}
			</ul>
			<div className={styles.chat_form}>
				<ChatInviteButton />
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={value}
						placeholder="Message"
						onChange={(e: any) => { setValue(e.target.value)}}
					/>
					<button onClick={handleSubmit}>Envoyer</button>
				</form>
			</div>
		</div>
	</section>
}

export default Chat;
