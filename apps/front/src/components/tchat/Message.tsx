import styles from "../../styles/Message.module.scss";
import { useAppContext } from '../../contexts/AppContext'
import Avatars from "../Avatars";

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

	const { session } = useAppContext();
	const { origin, type, value } = props;

	const isMe = origin === session.get("username");

	return <div className={isMe ? styles.message_right : styles.message_left}>
		{!isMe && <div className={styles.message_origin}>{origin}</div>}
		<Avatars.PurpleAvatar width="40px" height="40px" />
		{
			props.type === "invitation"
			? <InvitationMessage {...props} />
			: <DefaultMessage {...props} />
		}
	</div>
}

export default Message;
