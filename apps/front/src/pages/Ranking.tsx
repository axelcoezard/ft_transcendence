import styles from "../styles/pages/Ranking.module.scss"
import Avatar from "../components/Avatar";
import { useEffect, useState } from 'react';
import useSession from "../hooks/useSession";

const RankingListItem = (props: any) => {
	const { user } = props;

	return <div className={styles.ranked_list_item}>
		<h1>{props.position}</h1>
		<div className={styles.ranked_list_item_info}>
			<h3>{user.username}</h3>
			<p>{user.ELO_score} ELO</p>
		</div>
		<Avatar user={user.id} height = "50px" width = "50px"/>
	</div>
}

const Ranking = () => {
	const [users, setUsers] = useState<any[]>([]);
	const session = useSession("session");

	const fetchRanking = async () => {
		let res = await fetch("http://localhost:3030/users/ranking", {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		})
		if (!res) return;
		let data = await res.json()
		setUsers(data)
	}

	useEffect(() => {fetchRanking()}, [])

	return <main className = {styles.ranked}>
		<div className = {styles.ranked_header}>
			<h1>Classement</h1>
		</div>
		{users.length >= 3 ? <div className = {styles.ranked_podium}>
			<div className={styles.ranked_podium_flex}>
				<Avatar user={users[1].id} height = "60px" width = "60px"/>
				<h3>{users[1].username}</h3>
				<p>{users[1].ELO_score}</p>
				<div className={styles.ranked_podium2}>2</div>
			</div>
			<div className={styles.ranked_podium_flex}>
				<Avatar user={users[0].id} height = "60px" width = "60px"/>
				<h3>{users[0].username}</h3>
				<p>{users[0].ELO_score}</p>
				<div className = {styles.ranked_podium1}>1</div>
			</div>
			<div className={styles.ranked_podium_flex}>
				<Avatar user={users[2].id} height = "60px" width = "60px"/>
				<h3>{users[2].username}</h3>
				<p>{users[2].ELO_score}</p>
				<div className={styles.ranked_podium3}>3</div>
			</div>
		</div> : <p>Il manque des joueurs pour faire un classement...</p>}

		<div className = {styles.ranked_list}>
			{users.map((user: any, index: number) => {
				if (index < 3) return null;
				return <RankingListItem
					key={index}
					position={index + 1}
					user={user}
				/>
			})}
		</div>

	</main>
}

export default Ranking;
