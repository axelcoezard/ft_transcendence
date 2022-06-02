import styles from "../styles/View.module.scss"
import { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from "../components/Avatar";

const ViewGame = (props: any) => {
	const {value} = props;
	const navigate = useNavigate()

	const handleClick = (e: any) => {
		e.preventDefault();
		navigate(`/play/${value.slug}`)
	}

	return <li className={styles.view_table_item}>
		<div className={styles.view_table_item_left}>
			<Avatar user={value.user1_id} />
			<strong>VS</strong>
			<Avatar user={value.user2_id} />
		</div>
		<div className={styles.view_table_item_right}>
			<button onClick={handleClick}>Regarder</button>
		</div>
	</li>
}

const View = () => {
	const [games, setGames] = useState<any[]>([]);

	useEffect(() => {
		let it = setInterval(() => {
			fetch("http://c2r2p3.42nice.fr:3030/games/started")
			.then(res => res.json().then(data => setGames(data)))
			.catch(err => console.log(err))
		}, 1000 * 60)
		return () => clearInterval(it)
	}, [])

	return <main className={styles.view}>
		<div className={styles.view_header}>
			<h1 className={styles.view_h1}>VIEW</h1>
			<p>Trouvez une partie à regarder en toute discretion</p>
		</div>
		<ul className={styles.view_table}>
			{games.length > 0 ? games.map((game, index) => <ViewGame
				key={index}
				value={game}
			/>) : <p>Aucune partie en cours</p>}
		</ul>
	</main>
}

export default View;
