import { Component, ContextType, useEffect, useLayoutEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import AppContext, { AppContextType, useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import Avatar from '../components/Avatar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatChannel from '../components/chat/ChatChannel';

const InviteMessage = (props: any) => {
	return <></>
}

const ChatInviteButton = (props: any) => {
	return <button>+</button>
}

const ChatForm = (props: any) => {
	const { socket } = useAppContext();
	const session = useSession("session");
	const { slug } = props;
	const [value, setValue] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (value.length < 1 || value.length > 255 || value.match(/^\s+$/))
			return;
		socket.emit("msg", "chat", slug, {
			id: session.get("id"),
			username: session.get("username"),
			channel_slug: slug,
			type: "text",
			value: value,
			updated_at: new Date().toISOString()
		})
		console.log("emited")
		setValue("")
	}

	return <form onSubmit={handleSubmit}>
		<input
			type="text"
			value={value}
			placeholder="Message"
			onChange={(e: any) => { setValue(e.target.value)}}
		/>
		<button onClick={handleSubmit}>Envoyer</button>
	</form>
}

const Chat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	let [messages, setMessages] = useState<any[]>([]);
	let [channels, setChannels] = useState<any[]>([]);
	let {slug} = useParams();

	const addMessage = (message: any) => {
		messages.unshift(message);
		setMessages(messages)
	}

	const setupChannels = async () => {
		const res = await fetch(`http://localhost:3030/users/${session.get("id")}/channels`);
		const data = await res.json();
		setChannels(data);
	}

	const setupSocket = () => {
		socket.emit("join", "chat", slug, {
			id: session.get("id"),
			username: session.get("username")
		})
		socket.on("chat.channel", (res: any) => setChannels(res))
		socket.on("chat.msg", (res: any) => addMessage(res))
	}

	useEffect(() => {
		if (socket.ready)
			setupSocket();
	}, [socket.ready, slug])

	useEffect(() => {
		console.log("received", messages)
	}, [messages])

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
			{channels.map((channel: any, i: number) => {
				return <ChatChannel key={i} channel={channel} />
			})}
		</ul>
		<div className={styles.chat_content}>
			<ul className={styles.chat_messages}>
				{messages.map((message: any, index: number) => {
					let props = { key: index, ...message};
					if (message.type === "text")
						return <ChatMessage {...props}/>
					return <InviteMessage {...props}/>
				})}
			</ul>
			<div className={styles.chat_form}>
				<ChatInviteButton />
				<ChatForm slug={slug}/>
			</div>
		</div>
	</section>
}

export default Chat;
