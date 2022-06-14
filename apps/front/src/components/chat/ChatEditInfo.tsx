import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatInfoForm from "../../components/chat/ChatInfoForm";
import ChatSearchForm from "../../components/chat/ChatSearchForm";
import ChatSecurityForm from "../../components/chat/ChatSecurityForm";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/Chat.module.scss";
import ChatVisibilityForm from "../../components/chat/ChatVisibilityForm";
import ChatDeleteButton from "../../components/chat/ChatDeleteButton";
import { useAppContext } from "../../contexts/AppContext";

const ChatEditInfo = (props: any) => {
	const session = useSession("session");
	const {socket} = useAppContext();
	const navigate = useNavigate()
	const {setLoading, slug} = props;
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [password, setPassword] = useState<string | null>(null);
	const [status, setStatus] = useState<boolean>(false);

	const handleClick = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		let res = await fetch(`http://localhost:3030/channels/${slug}/update`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, users, password, status: status ? "public" : "private" })
		})
		setTimeout(async () => {
			let data = await res.json()
			setLoading(false);
			if (data.error)
				return setError(data.error);
			setUsers(users.filter((u: any) => u.username === session.get("username")));
			setName(null);
			setPassword(null);
			socket.emit("chat.create", "broadcast", "", {});
			navigate(`/chat/${slug}`)
		}, 1250);
	}

	const fetchInformations = async (slug: string) => {
		let res, data;
		res = await fetch(`http://localhost:3030/channels/${slug}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		})
		data = await res.json()
		if (data.error) return;
		setName(data.name);
		setStatus(data.status === "public");
		res = await fetch(`http://localhost:3030/channels/${slug}/users`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		})
		data = await res.json()
		if (data.error) return setError(data.error);
		setUsers(data);
	}

	useEffect(() => {
		if (slug) fetchInformations(slug);
	}, [slug])

	return <div className={styles.chat_edit_form}>
		{error && <p className={styles.chat_edit_form_error}>{error}</p>}
		<label>Informations</label>
		<ChatInfoForm setName={setName} name={name}/>
		<label>Participants</label>
		<ChatSearchForm setUsers={setUsers} users={users} />
		<label>Visibilite</label>
		<ChatVisibilityForm setStatus={setStatus} status={status}/>
		<label>Securite <small>(Option)</small></label>
		<ChatSecurityForm setPassword={setPassword} password={password} />
		<div className={styles.chat_edit_buttons}>
			<ChatDeleteButton slug={slug} />
			<button
				className={styles.chat_edit_button}
				onClick={handleClick}
			>Editer</button>
		</div>
	</div>
}

export default ChatEditInfo;
