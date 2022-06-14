import { useState } from "react";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/Chat.module.scss";
import DefaultScenery from "../assets/Scenery";
import { useNavigate } from "react-router-dom";

const ChatPassword  = (props: any) => {
	const {slug, setConnected, name} = props;
	const session = useSession("session");
	const [password, setPassword] = useState<string | null>(null);
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const handleError = (error: string) => {
		setError(error);
		setTimeout(() => setError(null), 2000);
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!password || password.length < 1 || password.match(/^\s+$/))
			return handleError("Password is empty");

		let res = await fetch(`http://localhost:3030/channels/${slug}/join`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ user_id: session.get("id"), password })
		});
		let data = await res.json();
		if (data.error) return handleError(data.error);
		setConnected(true);
	}

	return <div className={styles.chat_password}>
		<div className={styles.chat_password_container}>
			<h1>Mot de passe</h1>
			<p>Veuillez entrer le mot de passe de: <br/>{name}</p>
			{error && <strong className={styles.chat_password_error}>{error}</strong>}
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					value={password || ""}
					onChange={(e) => setPassword(e.target.value || e.currentTarget.value)}
					placeholder="Mot de passe"
				/>
				<button type="submit" onClick={handleSubmit}>Valider</button>
			</form>
		</div>
	</div>
}

export default ChatPassword;
