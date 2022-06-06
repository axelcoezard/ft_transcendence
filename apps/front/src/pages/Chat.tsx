import { useEffect, useState } from 'react'
import styles from '../styles/Chat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import Avatar from '../components/Avatar';

const ChatMessage = (props: any) => {
	const session = useSession("session");
	const { sender_username, sender_id, value, updated_at} = props;

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
			<p>{value}</p>
		</div>
	</li>
}

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
			value: value
		})
		console.log("emited")
		setValue("")
	}

	return <> <input
			type="text"
			value={value}
			placeholder="Message"
			onChange={(e: any) => { setValue(e.target.value)}}
		/>
		<button onClick={handleSubmit} onSubmit={handleSubmit}>Envoyer</button>
	</>
}

const Chat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const [messages, setMessages] = useState<any[]>([]);
	const [channels, setChannels] = useState<any[]>([]);
	let {slug} = useParams();

	useEffect(() => {
		if (socket.ready)
		{
			socket.emit("join", "chat", slug, {
				id: session.get("id"),
				username: session.get("username")
			})
			socket.on("chat.channel", (res: any) => setChannels(res))
			socket.on("chat.msg", (res: any) => {
				setMessages(res)
				console.log(res)
			})
		}
	}, [socket.ready, slug])

	return <section className={styles.chat}>
		<div className={styles.chat_header}>
			<div className={styles.chat_header_left}>
				<button>Discuter</button>
			</div>
			<div className={styles.chat_header_right}>
				<button>Options</button>
			</div>
		</div>
		<div className={styles.chat_index}></div>
		<div className={styles.chat_content}>
			<ul className={styles.chat_messages}>
				{messages.map((message: any, index: number) => {
					let props = { key: index, ...message};
					if (message.type === "chat")
						return <ChatMessage {...props}/>
					return <InviteMessage {...props}/>
				})}
			</ul>
			<form className={styles.chat_form}>
				<ChatInviteButton />
				<ChatForm slug={slug}/>
			</form>
		</div>
	</section>
}

export default Chat;
