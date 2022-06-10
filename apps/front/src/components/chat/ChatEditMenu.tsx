import styles from "../../styles/pages/Chat.module.scss";

const ChatEditMenu = (props: any) => {
	const {onglet, setOnglet} = props;

	return <nav className={styles.chat_edit_menu}>
		<button className={onglet ==="infos" ? styles.chat_edit_menu_active : ""} onClick={(e) => {setOnglet("infos")}}>Infos</button>
		<button className={onglet ==="users" ? styles.chat_edit_menu_active : ""} onClick={(e) => {setOnglet("users")}}>Participants</button>
	</nav>
}

export default ChatEditMenu;
