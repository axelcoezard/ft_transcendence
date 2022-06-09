import { useEffect, useState } from 'react'
import styles from '../styles/pages/Chat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import ChatChannel from '../components/chat/ChatChannel';
import ChatEditButton from '../components/chat/ChatEditButton';
import ChatLeaveButton from '../components/chat/ChatLeaveButton';
import ChatConversation from '../components/chat/ChatConversation';

const Chat = () => {
	const session = useSession("session");
	let [status, setStatus] =  useState<any[]>([]);
	let [channels, setChannels] = useState<any[]>([]);
	let [bloqued, setBloqued] = useState<any[]>([]);
	let {slug} = useParams();

	const setupBloqued = async () => {
		const res = await fetch(`http://c2r2p3.42nice.fr:3030/users/${session.get("id")}/blockeds`, {
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

	const isAdmin = () => {
		return status.find((p: any) => {
			return session.get("id") === p.id && (p.rank === "owner" || p.rank === "admin")
		})
	}

	useEffect(() => {
		setupChannels();
		setupBloqued();
	}, []);

	return <section className={styles.chat}>
		{}
		<div className={styles.chat_header}>
			<div className={styles.chat_header_left}>
				<Link to="/chat/create">Nouvelle discussion</Link>
			</div>
			<div className={styles.chat_header_right}>{slug && <>
				<ChatLeaveButton slug={slug} />
				{isAdmin() && <ChatEditButton slug={slug}/>}
			</>}</div>
		</div>
		<ul className={styles.chat_index}>
			{channels && channels.map((channel: any, i: number) => {
				return <ChatChannel key={i} channel={channel} />
			})}
		</ul>
		<ChatConversation
			slug={slug}
			bloqued={bloqued}
			status={status} setStatus={setStatus}
		/>
	</section>
}

export default Chat;
