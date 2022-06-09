import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatInfoForm from "../components/chat/ChatInfoForm";
import ChatSearchForm from "../components/chat/ChatSearchForm";
import ChatSecurityForm from "../components/chat/ChatSecurityForm";
import useSession from "../hooks/useSession";
import styles from "../styles/pages/ChatCreate.module.scss";
import Loading from "../components/Loading";
import ChatVisibilityForm from "../components/chat/ChatVisibilityForm";
import ChatDeleteButton from "../components/chat/ChatDeleteButton";

const ChatEdit = () => {
	const session = useSession("session");
	const navigate = useNavigate()
	const {slug} = useParams();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [name, setName] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [password, setPassword] = useState<string | null>(null);
	const [status, setStatus] = useState<boolean>(false);

	const handleClick = async (e: any) => {
		e.preventDefault();
	}

	const fetchInformations = async (slug: string) => {
		let res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${slug}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		})
		let data = await res.json()
		console.log(data)
		if (data.error) return;
		setName(data.name);
		setStatus(data.status === "public");
	}

	useEffect(() => {
		if (slug) fetchInformations(slug);
	}, [slug])

	return <>{loading
		? <Loading title="Edition du tchat" subtitle="Veuillez patienter..." />
		: <section className={styles.chat_create}>
			<div className={styles.chat_create_header}>
				<h1>Editer la discussion</h1>
			</div>
			<div className={styles.chat_create_form}>
				{error && <p className={styles.chat_create_error}>{error}</p>}
				<label>Informations</label>
				<ChatInfoForm setName={setName} name={name}/>
				<label>Participants</label>
				<ChatSearchForm setUsers={setUsers} users={users} />
				<label>Visibilite</label>
				<ChatVisibilityForm setStatus={setStatus} status={status}/>
				<label>Securite <small>(Option)</small></label>
				<ChatSecurityForm setPassword={setPassword} password={password} />
				<div className={styles.chat_create_buttons}>
					<ChatDeleteButton slug={slug} />
					<button
						className={styles.chat_create_button}
						onClick={handleClick}
					>Editer</button>
				</div>
			</div>
		</section>}</>
}

export default ChatEdit;
