import styles from "../styles/Components.module.scss";
import { useAppContext } from '../contexts/AppContext'
import Avatars from "./Avatars";
import { Link } from "react-router-dom";

const Conversations = (props: any) => {
	const { session } = useAppContext();
	const { channel, to } = props;

	return <Link className={styles.conversations} to={to}>
		<div className={styles.conversations_sub_infography}>
			<Avatars.PurpleAvatar width="3vw" height="3vw" /> {/* BACK: Actual user/channal avatar */}
			<div className={styles.conversations_infography}>
				<p className={styles.conversations_header}>{channel}</p> {/* BACK: Actual name */}
			</div>
		</div>
	</Link>
}

export default Conversations;
