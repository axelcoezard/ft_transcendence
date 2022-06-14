import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/Chat.module.scss";

const ChatLeaveButton = (props: any) => {
	const {slug, setupChannels} = props;
	const session = useSession("session");
	const navigate = useNavigate();

	const handleClick = async (e: any) => {
		e.preventDefault();
		let res = await fetch(`http://localhost:3030/channels/${slug}/leave`, {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(session.value)
		})
		let data = await res.json()
		if (data.error) return alert(data.error);
		setupChannels();
		navigate(`/chat`)
	}

	return <button
		className={styles.chat_header_leave_button}
		onClick={handleClick}
	>Quitter</button>
}

export default ChatLeaveButton
