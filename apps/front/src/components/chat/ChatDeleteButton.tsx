import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import useSession from "../../hooks/useSession";
import useSocket from "../../hooks/useSocket";
import styles from "../../styles/pages/ChatCreate.module.scss";

const ChatDeleteButton = (props: any) => {
	const { socket } = useAppContext()
	const { slug } = props;
	const session = useSession("session");
	const navigate = useNavigate();

	const handleClick = async (e: any) => {
		e.preventDefault();
		let res = await fetch(`http://localhost:3030/channels/${slug}`, {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: session.get("id") })
		});
		let data = await res.json();
		if (data.error) return;
		socket.emit("chat.delete", "broadcast", "", {});
		navigate("/chat");
	}

	return <button
		className={styles.chat_delete_button}
		onClick={handleClick}
	>Supprimer</button>
}

export default ChatDeleteButton
