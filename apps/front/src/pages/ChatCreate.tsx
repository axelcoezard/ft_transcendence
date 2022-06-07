import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ChatInfoForm from "../components/chat/ChatInfoForm";
import ChatSearchForm from "../components/chat/ChatSearchForm";
import ChatSecurityForm from "../components/chat/ChatSecurityForm";
import useSession from "../hooks/useSession";
import styles from "../styles/ChatCreate.module.scss";
import Loading from "../components/Loading";
import { setegid } from "process";

const ChatCreate = () => {
	const session = useSession("session");
	const navigate = useNavigate()
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [name, setName] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [password, setPassword] = useState<string | null>(null);

	const handleClick = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		let res = await fetch("http://c2r2p3.42nice.fr:3030/channels/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, users, password, creator_id: session.get("id")})
		})
		setTimeout(async () => {
			let data = await res.json()
			setLoading(false);
			if (data.error)
				return setError(data.error);
			setUsers(users.filter((u: any) => u.username === session.get("username")));
			setName(null);
			setPassword(null);
			navigate(`/chat/${data.slug}`)
		}, 1250);
	}

	return <>{loading
		? <Loading title="Création du tchat" subtitle="Veuillez patienter..." />
		: <section className={styles.chat_create}>
			<div className={styles.chat_create_header}>
				<h1>Nouvelle discussion</h1>
			</div>
			<div className={styles.chat_create_form}>
				{error && <p className={styles.chat_create_error}>{error}</p>}
				<label>Informations</label>
				<ChatInfoForm setName={setName} name={name}/>
				<label>Participants</label>
				<ChatSearchForm setUsers={setUsers} users={users} />
				<label>Securite <small>(Option)</small></label>
				<ChatSecurityForm setPassword={setPassword} password={password} />
				<button
					className={styles.chat_create_button}
					onClick={handleClick}
				>C'est parti!</button>
			</div>
		</section>}</>
}

export default ChatCreate;
