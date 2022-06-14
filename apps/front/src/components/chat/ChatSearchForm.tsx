import { useLayoutEffect, useState } from "react";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/ChatCreate.module.scss";

const ChatSearchForm = (props: any) => {
	const session = useSession("session");
	const {users, setUsers} = props;
	const [search, setSearch] = useState<any[]>([]);
	const [query, setQuery] = useState<string>("");

	useLayoutEffect(() => {
		setUsers([{
			...session.value,
			rank: "owner"
		}])
	}, [])

	const handleSearch = async (e: any) => {
		const search = e.target.value;
		setQuery(search);
		if (!search || search.length == 0 || !search.trim())
			return setSearch([])
		const response = await fetch(`http://localhost:3030/users/search/${search.trim()}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		});
		const data = await response.json();
		if (data.error)
			return setSearch([])
		setSearch(data);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let res = search.filter((user: any) => user.username === query)
		if (res.length !== 1) return;
		let user = {...res[0], rank: "member"};
		let exists = users.filter((u: any) => u.username === user.username);
		if (exists.length > 0) return;
		setUsers([...users, user])
		setQuery("")
	}

	return <div className={styles.chat_create_search}>
		<ul className={styles.chat_create_search_list}>{users.map((user: any, i: number) => {
			return <li key={i}>
				<span>{user.username}</span>
				{user.id !== session.get("id") && <button onClick={(e: any) => {
					e.preventDefault();
					setUsers(users.filter((u: any) => u.username !== user.username))
				}}>X</button>}
			</li>
		})}</ul>
		<form onSubmit={handleSubmit}>
			<input
				type="search"
				value={query}
				placeholder="Ajouter des participants"
				onChange={handleSearch}
				list="chat_search_user"
			/>
			<datalist id="chat_search_user">{search.map((user: any, index: number) => {
					return <option key={index} value={user.username} />
			})}</datalist>
		</form>
	</div>
}

export default ChatSearchForm;
