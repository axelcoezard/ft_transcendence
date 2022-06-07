import styles from '../../styles/pages/Chat.module.scss'
import useSession from '../../hooks/useSession';
import Avatar from '../../components/Avatar';

const ChatMessage = (props: any) => {
	const session = useSession("session");
	const {
		sender_username,
		sender_id,
		value, updated_at
	} = props;

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

export default ChatMessage;
