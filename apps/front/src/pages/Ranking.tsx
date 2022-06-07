
import styles from "../styles/Ranking.module.scss"
import Avatar from "../components/Avatar";
import { useEffect, useState } from 'react';

const RankingListItem = (props: any) => {
	const { user, idx } = props;

	return <div className={styles.ranked_list_item}>
		<h1>{props.position}</h1>
		<Avatar user = {user.id} height = "60px" width = "60px"/>
		<div className={styles.ranked_list_item_info}>
			<h3>user</h3>
			<p>150ELO</p>
		</div>
		<h1>{user.name}</h1>
	</div>
}

const Ranking = () => {
	const [users, setUsers] = useState<any[]>([]);

	const fetchRanking = async () => {
		let res = await fetch("http://c2r2p3.42nice.fr:3000/users/ranking")
		if (!res) return;
		let data = await res.json()
		setUsers(data)
	}

	useEffect(() => {fetchRanking()}, [])

	return <main className = {styles.ranked}>
		<div className = {styles.ranked_header}>
			<h1>Ranked</h1>
		
		</div>
		{users.length >= 3 ? <div className = {styles.ranked_podium}>
			<div className = {styles.ranked_podium_flex}>
				<Avatar user = {users[1].id} height = "60px" width = "60px"/>
				<p>{users[1].name} =  {users[1].ELO_score}</p>
				<div className = {styles.ranked_podium2}>2</div>
			</div>
			<div className = {styles.ranked_podium_flex}>
				<Avatar user = {users[0].id} height = "60px" width = "60px"/>
				<p>{users[1].name} =  {users[1].ELO_score}</p>
				<div className = {styles.ranked_podium1}>1</div>
			</div>
			<div className = {styles.ranked_podium_flex}>
				<Avatar user = {users[2].id} height = "60px" width = "60px"/>
				<p>{users[1].name} =  {users[1].ELO_score}</p>
				<div className = {styles.ranked_podium3}>3</div>
			</div>
		</div> : <p>Not enought players to enable ranking :(</p>}

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
