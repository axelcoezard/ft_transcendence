import { useEffect, useState } from "react";
import useSession from "../../hooks/useSession";
import styles from "../../styles/pages/Chat.module.scss";
import Avatar from "../Avatar";

const ChatEditUsers = (props: any) => {
	const {setLoading, slug} = props;
	const session = useSession("session");
	const [error, setError] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]);

	const fetchUsers = async () => {
		let res, data;
		res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${slug}/users`, {
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

	const getRank = (rank: any) => {
		if (rank === "owner") return "Propriétaire";
		if (rank === "admin") return "Administrateur";
		return "Membre";
	}

	return <div className={styles.chat_edit_users}>
		{error && <p className={styles.chat_edit_form_errors}>{error}</p>}
		<ul className={styles.chat_edit_users_list}>
			{users.map((u: any, i: number) => <li key={i}>
				<div className={styles.chat_edit_users_avatar}>
					<Avatar user={u.id} width="40px" height="40px" />
				</div>
				<div className={styles.chat_edit_users_rank}>
					<strong>{u.username}</strong>
					<small>{getRank(u.rank)}</small>
				</div>
				<div className={styles.chat_edit_users_actions}>
					{u.rank !== "owner" && u.id !== session.get("id") && <>
						{u.rank !== "admin"
							? <UpgradeButton user={u} />
							: <DowngradeButton user={u} />}
						<StatusButton slug={slug} user={u}/>
					</>}
				</div>
			</li>)}
		</ul>
	</div>
}

const UpgradeButton = (props: any) => {
	return <button className={styles.chat_edit_users_button}>
		<span>Upgrade</span>
		<img src="/svgs/upgrade.svg" alt="mute" />
	</button>
}

const DowngradeButton = (props: any) => {
	return <button className={styles.chat_edit_users_button}>
		<span>Downgrade</span>
		<img src="/svgs/downgrade.svg" alt="downgrade" />
	</button>
}

const StatusButton = (props: any) => {
	const {user, slug} = props;
	const session = useSession("session");
	const [status, setStatus] = useState<string>(() => user.status);

	const handleClick = async (e: any, newStatus: string) => {
		e.preventDefault();
		let res, data;
		res = await fetch(`http://c2r2p3.42nice.fr:3030/channels/${slug}/users/${user.id}/status`, {
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
