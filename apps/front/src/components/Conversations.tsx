import styles from "../styles/Components.module.scss";
import { useAppContext } from '../contexts/AppContext'
import Avatars from "./Avatars";

const Conversations = (props: any) => {
	const { session } = useAppContext();
	const { channel } = props;
	
	return <div className={styles.conversations}>
		<div className={styles.conversations_sub_infography}>
			<Avatars.PurpleAvatar width="3vw" height="3vw" /> {/* BACK: Actual user/channal avatar */}
			<div className={styles.conversations_infography}>
				<p className={styles.conversations_header}>{channel}</p> {/* BACK: Actual name */}
				<p className={styles.conversations_message}>Actual message</p> {/*  BACK: Actual message */}
			</div>
		</div>
		<p className={styles.conversations_message}>06h78</p> {/*  BACK: Actual message */}
	
	</div>
}

export default Conversations;