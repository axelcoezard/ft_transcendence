import styles from "../../styles/pages/ChatCreate.module.scss";

const ChatVisibilityForm = (props: any) => {
	const {status, setStatus} = props;
	return <form className={styles.chat_create_switch_form}>
			<label className={styles.chat_create_switch}>
			<input
				type="checkbox"
				checked={status}
				onChange={(e: any) => setStatus(e.target.checked)}
			/>
			<span className={styles.chat_create_switch_label} data-on="Public" data-off="Prive"></span>
			<span className={styles.chat_create_switch_handle}></span>
		</label>
	</form>
}

export default ChatVisibilityForm;

