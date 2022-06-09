import styles from "../../styles/pages/Chat.module.scss";

const ChatLeaveButton = (props: any) => {
	const {slug} = props;

	return <button className={styles.chat_header_leave_button}>Quitter</button>
}

export default ChatLeaveButton
