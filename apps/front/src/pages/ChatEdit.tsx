import styles from "../styles/pages/Chat.module.scss";
import Loading from "../components/Loading";
import ChatEditInfo from "../components/chat/ChatEditInfo";
import ChatEditMenu from "../components/chat/ChatEditMenu";
import { useEffect, useState } from "react";
import ChatEditUsers from "../components/chat/ChatEditUsers";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useSession from "../hooks/useSession";

const ChatEdit = () => {
	const session = useSession("session");
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [onglet, setOnglet] = useState<string>("infos");
	const {slug} = useParams()

	useEffect(() => {
		if (slug)
			fetch(`http://localhost:3030/channels/${slug}/users/${session.get("id")}/rank`, {
				method: "GET",
				headers: {
					'Authorization': `Bearer ${session.get("request_token")}`,
					'Content-Type': 'application/json'
				}
			}).then(res => res.json().then(data => {
				if (data.error || !data[0] || data[0].rank === "member")
					navigate("/chat")
			}))
	}, [slug])

	return <>{loading
		? <Loading title="Mise à jour" subtitle="Veuillez patienter..." />
		: <section className={styles.chat_edit}>
			<div className={styles.chat_edit_header}>
				<h1>Editer</h1>
			</div>
			<ChatEditMenu onglet={onglet} setOnglet={setOnglet} />
			{onglet === "infos" && <ChatEditInfo slug={slug} setLoading={setLoading} />}
			{onglet === "users" && <ChatEditUsers slug={slug} setLoading={setLoading} />}
		</section>}</>
}

export default ChatEdit;
