import styles from "../styles/pages/Invite.module.scss"
import { useState } from 'react'
import useSession from "../hooks/useSession";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"

const Invite = () => {
	const session = useSession("session");
	const {socket} = useAppContext();
	const [search, setSearch] = useState<any[]>([]);
	const [query, setQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate()

	const handleSearch = async (e: any) => {
		const search = e.target.value;
		setQuery(search);
		if (!search) return;
		if (!search.trim()) return;
		const response = await fetch(`http://localhost:3030/users/search/${search.trim()}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await response.json();
		if (data.error) return;
		setSearch(data.error ? [] : data.filter((u: any) => u.id !== session.get("id")));
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let ress = search.filter((user: any) => user.username === query)
		if (ress.length !== 1) return;
		setLoading(true);
		let res = await fetch("http://localhost:3030/channels/create", {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: ress[0].username,
				users: [
					{...session.value, rank: "owner"},
					{...ress[0], rank: "member"}
				],
				password: null,
				creator_id: session.get("id"),
				receiver_id: ress[0].id,
				status: "private"
			})
		})
		setTimeout(async () => {
			let data = await res.json()
			setLoading(false);
			if (data.error) return;
			setQuery("")
			setSearch([])
			socket.emit("chat.create", "broadcast", "", {});
			navigate(`/chat/${data.slug}`)
		}, 1250);
	}

	return <>{loading ? <Loading
		title="Création de la discussion"
		description="Veuillez patienter..."
	/> : <section className={styles.invite}>
		<div className={styles.invite_header}>
			<h1>INVITE</h1>
			<p>Commencez a discuter des maintenant!</p>
		</div>
		<form className={styles.invite_form} onSubmit={handleSubmit}>
			<input className={styles.invite_input}
				type="text"
				value={query}
				placeholder="Destinataire"
				onChange={handleSearch}
				list="invite_search_user"
			/>
			<datalist id="invite_search_user">{search.map((user: any, index: number) => {
				return <option key={index} value={user.username} />
			})}</datalist>
			<button className={styles.invite_button}
				onClick={handleSubmit}>
				<p className={styles.invite_text}>Discuter</p>
			</button>
		</form>
	</section>}</>
}

export default Invite;
