import styles from "../styles/pages/Chat.module.scss";
import Loading from "../components/Loading";
import ChatEditInfo from "../components/chat/ChatEditInfo";
import ChatEditMenu from "../components/chat/ChatEditMenu";
import { useState } from "react";
import ChatEditUsers from "../components/chat/ChatEditUsers";
import { useParams } from "react-router-dom";

const ChatEdit = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [onglet, setOnglet] = useState<string>("infos");
	const {slug} = useParams()

	return <>{loading
		? <Loading title="Edition du tchat" subtitle="Veuillez patienter..." />
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
