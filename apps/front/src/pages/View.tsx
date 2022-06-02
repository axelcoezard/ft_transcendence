import styles from "../styles/View.module.scss"
import { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';
import Avatar from "../components/Avatar";

const ViewGame = (props: any) => {
	const {value} = props;

	const handleClick = (e: any) => {
		e.preventDefault();
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
		setGames([
			{
				user1_id: 14,
				user2_id: 16,
				slug: 'sedznxgszg'
			},
			{
				user1_id: 18,
				user2_id: 14,
				slug: 'sedznxgszg'
			}
		])
	}, [])

	return <main className={styles.view}>
		<div className={styles.view_header}>
			<h1 className={styles.view_h1}>VIEW</h1>
			<p>Trouvez une partie à regarder en toute discretion</p>
		</div>
		<ul className={styles.view_table}>
			{games.map((game, index) => <ViewGame
				key={index}
				value={game}
			/>)}
		</ul>
	</main>
}

export default View;
