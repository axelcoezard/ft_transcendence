import styles from '../../styles/pages/Chat.module.scss'
import { Link } from 'react-router-dom';
import useSession from '../../hooks/useSession';
import Avatar from '../../components/Avatar';
import { useEffect, useState } from 'react';

const getStatus = (status: string) => {
	switch (status) {
		case 'started':
			return 'en cours';
		case 'ended':
			return 'finie';
		default:
			return 'en attente';
	}
}

const ChatInviteMessage = (props: any) => {
	const session = useSession("session");
	const [status, setStatus] = useState<string | null>(null);
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

	const fetchStatus = async () => {
		let res = await fetch(`http://localhost:3030/games/${game_slug}/status`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		let data = await res.json();
		if (data.error) return;
		setStatus(data.status);
	}

	useEffect(() => {
		fetchStatus();
	}, [])

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
			<div className={styles.chat_message_invite}>
				<div className={styles.chat_message_invite_left}>
					<strong>Invitation à jouer</strong>
					<small>Partie {status ? getStatus(status) : "introuvable"}</small>
				</div>
				<div className={styles.chat_message_invite_right}>
					{status && status !== 'ended' && <Link
						to={`/play/${game_slug}`}
					>Rejoindre</Link>}
				</div>
			</div>
		</div>
	</li>
}

export default ChatInviteMessage;
