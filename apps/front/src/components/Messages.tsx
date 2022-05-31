import styles from "../styles/Components.module.scss";
import { useAppContext } from '../contexts/AppContext'
import Avatars from "./Avatars";

const Messages = (props: any) => {
	const { session } = useAppContext();
	const { origin, message } = props;

	const isMe = origin === session.get("username");

	return <div className={!isMe ? styles.messages_user : styles.messages_other}>
		{isMe ? <>
			<p className={styles.messages_time}>17h45</p>
			<p className={styles.messages_text}>{message}</p>
			<Avatars.PurpleAvatar width="3vw" height="3vw" />
		</> : null}
		{!isMe ? <>
			<Avatars.PurpleAvatar width="3vw" height="3vw" />
			<p className={styles.messages_text}>{message}</p>
			<p className={styles.messages_time}>17h45</p>
		</> : null}
	</div>

}

export default Messages;
