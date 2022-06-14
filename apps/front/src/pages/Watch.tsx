import styles from "../styles/pages/Watch.module.scss"
import { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import Avatar from "../components/Avatar";
import useSession from "../hooks/useSession";

const GameToWatch = (props: any) => {
	const {value} = props;
	const navigate = useNavigate()

	const handleClick = (e: any) => {
		e.preventDefault();
		navigate(`/play/${value.slug}`)
	}

	return <li className={styles.watch_table_item}>
		<div className={styles.watch_table_item_left}>
			<Avatar user={value.user1_id} />
			<strong>VS</strong>
			<Avatar user={value.user2_id} />
		</div>
		<div className={styles.watch_table_item_right}>
			<button onClick={handleClick}>Regarder</button>
		</div>
	</li>
}

const Watch = () => {
	const [games, setGames] = useState<any[]>([]);
	const session = useSession("session");

	const updateGames = () => {
		fetch("http://localhost:3030/games/started", {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json().then(data => setGames(data)))
		.catch(err => console.log(err))
	}

	useEffect(() => {
		updateGames()
		let it = setInterval(updateGames, 1000 * 5)
		return () => clearInterval(it)
	}, [])

	return <main className={styles.watch}>
		<div className={styles.watch_header}>
			<h1>WATCH</h1>
			<p>Trouver une partie à regarder en toute discretion</p>
		</div>
		<ul className={styles.watch_table}>
			{games.length > 0 ? games.map((game, index) => <GameToWatch
				key={index}
				value={game}
			/>) : <p>Aucune partie en cours</p>}
		</ul>
	</main>
}

export default Watch;
