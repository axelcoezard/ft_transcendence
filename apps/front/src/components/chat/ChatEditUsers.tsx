import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/Chat.module.scss";
import Avatar from "../Avatar";

const getRank = (rank: any) => {
	if (rank === "owner") return "Propriétaire";
	if (rank === "admin") return "Administrateur";
	return "Membre";
}

const ChatEditUsers = (props: any) => {
	const {setLoading, slug} = props;
	const session = useSession("session");
	const [error, setError] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]);

	const fetchUsers = async () => {
		let res, data;
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
		if (slug) fetchUsers();
	}, [])

	return <div className={styles.chat_edit_users}>
		{error && <p className={styles.chat_edit_form_errors}>{error}</p>}
		<ul className={styles.chat_edit_users_list}>
			{users.map((u: any, i: number) => <UserItem
				key={i}
				user={u}
				slug={slug}
			/>)}
		</ul>
	</div>
}

const UserItem = (props: any) => {
	const {user, slug} = props
	const [rank, setRank] = useState<string>(() => user.rank);
	const session = useSession("session");

	return <li>
		<div className={styles.chat_edit_users_avatar}>
			<Avatar user={user.id} width="40px" height="40px" />
		</div>
		<div className={styles.chat_edit_users_rank}>
			<strong>{user.username}</strong>
			<small>{getRank(rank)}</small>
		</div>
		<div className={styles.chat_edit_users_actions}>
			{user.rank !== "owner" && user.id !== session.get("id") && <>
				<RankButton rank={rank} setRank={setRank} user={user} slug={slug} />
				<StatusButton slug={slug} user={user}/>
			</>}
		</div>
	</li>
}


const RankButton = (props: any) => {
	const {rank, setRank, user, slug} = props
	const session = useSession("session");
	const {socket} = useAppContext();

	const handleClick = async (e:any, newRank: string) => {
		e.preventDefault();
		let res, data;
		res = await fetch(`http://localhost:3030/channels/${slug}/users/${user.id}/rank`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({rank: newRank})
		})
		data = await res.json()
		if (data.error) return;
		setRank(newRank);
		socket.emit(`chat.status`, "broadcast", "", {
			channel_slug: slug,
			user_id: user.id,
		})
	}

	return <button
		className={styles.chat_edit_users_button}
		onClick={(e) => handleClick(e, rank === "admin" ? "member" : "admin")}
	>
		<span>{rank === "member" ? "Up" : "Down"}grade</span>
		<img src={`/svgs/${rank === "member" ? "up" : "down"}grade.svg`} alt="upgrade" />
	</button>
}

const StatusButton = (props: any) => {
	const {user, slug} = props;
	const {socket} = useAppContext();
	const session = useSession("session");
	const [status, setStatus] = useState<string>(() => user.status);

	const handleClick = async (e: any, newStatus: string) => {
		e.preventDefault();
		let res, data;
		res = await fetch(`http://localhost:3030/channels/${slug}/users/${user.id}/status`, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: newStatus })
		})
		data = await res.json()
		if (data.error) return;
		setStatus(newStatus);
		socket.emit(`chat.status`, "broadcast", "", {
			channel_slug: slug,
			user_id: user.id,
		})
	}

	let final: Array<any> = []
	if (status === "active" || status === "mute")
		final.push(<button
			key={0}
			className={styles.chat_edit_users_button}
			onClick={(e) => handleClick(e, status === "mute" ? "active" : "mute")}
		>
			<span>{status === "mute" ? "Unmute" : "Mute"}</span>
			<img src={`/svgs/${status === "mute" ? "unmute" : "mute"}.svg`} alt="mute" />
		</button>)

	if (status === "active" || status === "banned")
		final.push(<button
			key={1}
			className={styles.chat_edit_users_button}
			onClick={(e) => handleClick(e, status === "banned" ? "active" : "banned")}
		>
			<span>{status === "banned" ? "Unban" : "Ban"}</span>
			<img src={`/svgs/${status === "banned" ? "unban" : "ban"}.svg`} alt="ban" />
		</button>)

	return <>{final}</>
}

export default ChatEditUsers;
