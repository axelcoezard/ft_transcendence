import { useEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import ChatChannel from '../components/chat/ChatChannel';
import ChatEditButton from '../components/chat/ChatEditButton';
import ChatLeaveButton from '../components/chat/ChatLeaveButton';
import ChatConversation from '../components/chat/ChatConversation';
import { useAppContext } from '../contexts/AppContext';

const Chat = () => {
	const session = useSession("session");
	const {socket} = useAppContext();
	const navigate = useNavigate();
	let [status, setStatus] =  useState<any[]>([]);
	let [infos, setInfos] = useState<any>();
	let [channels, setChannels] = useState<any[]>([]);
	let [bloqued, setBloqued] = useState<any[]>([]);
	let {slug} = useParams();

	const setupBloqued = async () => {
		const res = await fetch(`http://localhost:3030/users/${session.get("id")}/blockeds`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setBloqued(data);
	}

	const setupChannels = async () => {
		const res = await fetch(`http://localhost:3030/users/${session.get("id")}/channels`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		const data = await res.json();
		setChannels(data);
	}

	const isAdmin = () => {
		return status && status.find((p: any) => {
			return session.get("id") === p.id && (p.rank === "owner" || p.rank === "admin")
		})
	}

	useEffect(() => {
		setupChannels();
		setupBloqued();
	}, []);

	useEffect(() => {
		if (socket.ready)
		{
			socket.on("chat.delete", (res: any) => {
				setupChannels();
				navigate("/chat")
			});
			socket.on("chat.create", (res: any) => setupChannels());
		}
	}, [socket.ready])

	return <section className={styles.chat}>
		{}
		<div className={styles.chat_header}>
			<div className={styles.chat_header_left}>
				<Link to="/chat/create">Nouvelle discussion</Link>
			</div>
			<div className={styles.chat_header_right}>{slug && <>
				{infos && infos.status === "private" && <ChatLeaveButton
					slug={slug}
					setupChannels={setupChannels}
				/>}
				{isAdmin() && <ChatEditButton slug={slug}/>}
			</>}</div>
		</div>
		<ul className={styles.chat_index}>
			{channels && channels.map((channel: any, i: number) => {
				return <ChatChannel key={i} channel={channel} slug={slug} />
			})}
		</ul>
		<ChatConversation
			slug={slug}
			bloqued={bloqued}
			status={status} setStatus={setStatus}
			infos={infos} setInfos={setInfos}
		/>
	</section>
}

export default Chat;
