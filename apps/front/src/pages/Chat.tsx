import { useEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import ChatMessage from '../components/chat/ChatMessage';
import ChatChannel from '../components/chat/ChatChannel';
import ChatInviteMessage from '../components/chat/ChatInviteMessage';
import ChatEditButton from '../components/chat/ChatEditButton';
import ChatLeaveButton from '../components/chat/ChatLeaveButton';

const Chat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	let [channels, setChannels] = useState<any[]>([]);
	let [messages, setMessages] = useState<any[]>([]);
	let [bloqued, setbloqued] = useState<any[]>([]);
	let [status, setstatus] =  useState<any[]>([]);
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
			body: JSON.stringify({
				creator_id: session.get("id")
			})
		})
		let data = await res.json();
		if (data.error) return;
		sendMessage("invite", `${data.invitation.slug}.${data.game.slug}`);
	}

	const setupBloqued = async () => {
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/users/${session.get("id")}/blockeds`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setbloqued(data);
	}

	const setupStatus = async () => {
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${slug}/users`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setstatus(data);
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
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${chan_slug}/messages`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await res.json();
		setMessages(data);
	}

	const isBanned = () => {
		return status.find((status: any) => {
			return session.get("id") === status.id && status.status === "banned"
		})
	}

	const isMuted = () => {
		return status.find((status: any) => {
			return session.get("id") === status.id && status.status === "mute"
		})
	}

	useEffect(() => {
		if (socket.ready)
		{
			socket.emit("join", "chat", slug, {})
			socket.on("chat.msg", (res: any) => setupMessages(res.channel_slug));
			socket.on("chat.join", (res: any) => setupChannels());
			setupChannels();
			setupMessages(slug);
			setupBloqued();
			setupStatus();
		}
		return () => { socket.emit("leave", "chat", slug, {}) }
	}, [socket.ready, slug]);

	return <section className={styles.chat}>
		<div className={styles.chat_header}>
			<div className={styles.chat_header_left}>
				<Link to="/chat/create">Nouvelle discussion</Link>
			</div>
			<div className={styles.chat_header_right}>{slug && <>
				<ChatLeaveButton slug={slug} />
				<ChatEditButton slug={slug} />
			</>}</div>
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
					// Affiche pas les messages posterieurs à la date de ban si on est ban
					let ban = isBanned()
					if (ban)
					{
						let banDate = new Date(ban.updated_at);
						let messageDate = new Date(message.created_at);
						console.log(banDate, messageDate, banDate.getTime() - messageDate.getTime());
						if (banDate.getTime() > messageDate.getTime())
							return null;
					}
					// Affiche pas le message si on a bloque l'utilisateur 
					if (bloqued.find((bloqued: any) => bloqued.id == message.sender_id))
						return null;
					// Affiche les messages au bon format: text ou invite
					if (message.type === "text")
						return <ChatMessage {...props}/>
					return <ChatInviteMessage {...props}/>
				})}
			</ul>
			<div className={styles.chat_form}>
			{(isMuted() || isBanned()) ? (
				<div className={styles.chat_muted}>
					<p>Vous {isMuted() ? "etes muet dans" : "etes banni de" } ce chat</p>
				</div>
			) : <>
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
			</>}</div>
		</div>
	</section>
}

export default Chat;
