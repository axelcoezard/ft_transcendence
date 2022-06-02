import styles from "../../styles/components/Message.module.scss";
import { useAppContext } from '../../contexts/AppContext'
import Avatar from "../Avatar";
import useSession from "../../hooks/useSession";

const DefaultMessage = (props: any) => {
	const message = props.value;

	const getTime = (created_at: string) => {
		const date = new Date(created_at);
		const day = date.toLocaleDateString("fr-FR", { weekday: 'long' });
		const hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	return <>
		<div className={styles.message_body}>{message.value}</div>
		<div className={styles.message_time}>
			<span>{getTime(message.created_at)}</span>
		</div>
	</>
}

const InvitationMessage = (props: any) => {
	return <>

	</>
}

const Message = (props: any) => {
	const session = useSession("session");
	const { origin, type, value } = props;

	const isMe = origin.id === session.get("id");

	return <div className={isMe ? styles.message_right : styles.message_left}>
		{!isMe && <div className={styles.message_origin}>{origin.username}</div>}
		<Avatar
			user={origin.id}
			className={styles.message_avatar}
			width="40px"
			height="40px"
		/>
		{
			props.type === "invitation"
			? <InvitationMessage {...props} />
			: <DefaultMessage {...props} />
		}
	</div>
}

export default Message;
