import { useEffect, useState } from 'react'
import styles from '../../styles/pages/Chat.module.scss'
import { useAppContext } from '../../contexts/AppContext';
import useSession from '../../hooks/useSession';
import ChatMessage from '../../components/chat/ChatMessage';
import ChatInviteMessage from '../../components/chat/ChatInviteMessage';
import ChatPassword from './ChatPassword';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';
import { RiGamepadLine } from 'react-icons/ri';

const ChatConversation = (props: any) => {
	const {socket} = useAppContext();
	const navigate = useNavigate();
	const session = useSession("session");
	const {
		slug, bloqued,
		status, setStatus,
		infos, setInfos
	} = props;
	let [messages, setMessages] = useState<any[]>([]);
	let [connected, setConnected] = useState<boolean>(false);
	let [value, setValue] = useState<string>("");

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
		let res = await fetch("http://localhost:3030/invitations/create", {
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

	const setupStatus = async (chan_slug: string | undefined) => {
		if (!chan_slug || !slug || chan_slug != slug) return;
		const res = await fetch(`http://localhost:3030/channels/${chan_slug}/users`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setStatus(data);
	}

	const setupMessages = async (chan_slug: string | undefined) => {
		if (!chan_slug || !slug || chan_slug != slug) return;
		const res = await fetch(`http://localhost:3030/channels/${chan_slug}/messages`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await res.json();
		setMessages(data);
	}

	const setupInfos = async (chan_slug: string | undefined) => {
		if (!chan_slug || !slug || chan_slug != slug) return;
		const res = await fetch(`http://localhost:3030/channels/${chan_slug}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await res.json();
		setInfos(data);
	}

	const isStatus = (value: string) => {
		return status && status.find((p: any) => {
			return session.get("id") === p.id && p.status === value
		})
	}
	const isBanned = () => isStatus("banned")
	const isMuted = () => isStatus("mute")

	const reset = () => {
		setMessages([]);
		setStatus([]);
		setInfos({});
		setConnected(false);
	}

	useEffect(() => {
		reset();
		if (socket.ready)
		{
			socket.emit("join", "chat", slug, {})
			socket.on("chat.msg", (res: any) => setupMessages(res.channel_slug));
			socket.on("chat.status", (res: any) => {
				if (res.channel_slug === slug)
					setupStatus(res.channel_slug);
			});
			setupInfos(slug);
			setupStatus(slug);
			setupMessages(slug);
		}
		return () => {
			reset();
			socket.emit("leave", "chat", slug, {})
		}
	}, [socket.ready, slug]);

	return <>{(!connected && infos && infos.password) ? (
		<ChatPassword
			slug={slug}
			name={infos.name}
			setConnected={setConnected}
		/>
	) : (<div className={styles.chat_content}>
		<ul className={styles.chat_messages}>
			{messages && messages.map((message: any, index: number) => {
				let props = { key: index, ...message};
				// Affiche pas les messages posterieurs à la date de ban si on est ban
				let ban = isBanned()
				if (ban)
				{
					let banDate = new Date(ban.updated_at);
					let messageDate = new Date(message.created_at);
					if (banDate.getTime() < messageDate.getTime())
						return null;
				}
				// Affiche pas le message si on a bloque l'utilisateur
				if (bloqued.find((bloqued: any) => bloqued.id == message.sender_id))
					return null;
				// Affiche les messages au bon format: text ou invite
				if (message.type === "text")
					return <ChatMessage {...props}/>
				if (isBanned()) return null
				return <ChatInviteMessage {...props}/>
			})}
		</ul>
		<div className={styles.chat_form}>
		{(isMuted() || isBanned()) ? (
			<div className={styles.chat_muted}>
				<strong>
					{isMuted() ? "Vous etes muet." : "Vous etes banni de ce tchat."}
				</strong>
				<small>
					{isMuted()
					? "Vous ne pouvez plus envoyer de messages dans le chat."
					: "Vous ne pouvez plus voir les nouveaux messages."}
				</small>
			</div>
		) : <>
			<button className={styles.chat_form_invite_button} onClick={handleInvitation}>
				<RiGamepadLine />
			</button>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					placeholder="Message"
					onChange={(e: any) => { setValue(e.target.value)}}
				/>
				<button
					className={styles.chat_form_message_button}
					onClick={handleSubmit}><IoMdSend /></button>
				</form>
		</>}</div>
	</div>)}</>
}

export default ChatConversation
