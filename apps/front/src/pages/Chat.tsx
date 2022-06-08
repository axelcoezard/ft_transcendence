import { useEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import Avatar from '../components/Avatar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatChannel from '../components/chat/ChatChannel';

const InviteMessage = (props: any) => {
	const session = useSession("session");
	const {
		sender_username,
		sender_id,
		value, updated_at
	} = props;
	let [slug, game_slug] = value.split(".");

	const getTime = (created_at: string) => {
		const date = new Date(created_at);
		const day = date.toLocaleDateString("fr-FR", { weekday: 'long' });
		const hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${day} ${hours}:${minutes}`;
	}

	const isSender = sender_id === session.get("id")

	return <li className={isSender ? styles.chat_message_right : styles.chat_message_left}>
		<div className={styles.chat_message_avatar}>
			<Avatar user={sender_id} height={40} width={40} />
		</div>
		<div className={styles.chat_message_body}>
			{isSender
				? <><small>{getTime(updated_at)}</small><b>{sender_username}</b></>
				: <><b>{sender_username}</b><small>{getTime(updated_at)}</small></>
			}
			<p><Link to={`/play/${game_slug}`}>Rejoindre</Link></p>
		</div>
	</li>
}

const Chat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	let [channels, setChannels] = useState<any[]>([]);
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState<string>("");
	let {slug} = useParams();

	const sendMessage = (type: string, value: string) => {
		socket.emit("msg", "chat", slug, {
			sender_id: session.get("id"),
			sender_username: session.get("username"),
			channel_slug: slug,
			type: type,
			value: value,
			updated_at: new Date().toISOString()
		})
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (value.length < 1 || value.length > 255 || value.match(/^\s+$/))
			return;
		sendMessage("text", value);
		setValue("")
	}

	const handleInvitation = async (e: any) => {
		e.preventDefault();
		let res = await fetch("http://c2r2p3.42nice.fr:3030/invitations/create", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ creator_id: session.get("id") })
		})
		let data = await res.json();
		if (data.error) return;
		sendMessage("invite", `${data.invitation.slug}.${data.game.slug}`);
	}

	const setupChannels = async () => {
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/users/${session.get("id")}/channels`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setChannels(data);
	}

	const setupMessages = async (chan_slug: string | undefined) => {
		if (!chan_slug || !slug || chan_slug != slug) return;
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${chan_slug}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await res.json();
		setMessages(data);
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
				<button onClick={handleInvitation}>+</button>
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
