import styles from "../styles/Components.module.scss";
import { useAppContext } from '../contexts/AppContext'
import Avatars from "./Avatars";

const Messages = (props: any) => {
	const { session } = useAppContext();
	const { origin, message } = props;
	
	if (origin === session.get("username")) {
		return <div className={styles.messages_user}>
			<Avatars.PurpleAvatar width="3vw" height="3vw" /> {/* BACK: Actual user avatar */}
			<p className={styles.messages_text}>{message}</p> {/* BACK: Actual message */}
			<p className={styles.messages_time}>17h45</p> {/* BACK */}
		</div>
	}
	else {
		return <div className={styles.messages_other}>
			<p className={styles.messages_time}>17h45</p> {/* BACK */}
			<p className={styles.messages_text}>{message}</p> {/* BACK: Actual message */}
			<Avatars.PurpleAvatar width="3vw" height="3vw" /> {/* BACK: Actual user avatar*/}
		</div>
	}
}

export default Messages;