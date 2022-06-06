import styles from '../../styles/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import { useEffect, useState } from 'react';
import useSession from '../../hooks/useSession';

const getWinnerAndLoser = (match: any): [any, any] => {
	let player1 = { id: match.user1_id, score: match.user1_score };
	let player2 = { id: match.user2_id, score: match.user2_score };
	let winner, loser;
	if (player1.score >= player2.score)
	{ winner = player1; loser = player2; }
	else { winner = player2; loser = player1; }
	return [winner, loser];
}

const ProfilMatch = ({match}: {match: any}) => {
	let [winner, loser] = getWinnerAndLoser(match);

	const Player = ({pos, user}: {pos: string, user: any}) => {
		return <div className={pos === "left"
			? styles.profil_match_left
			: styles.profil_match_right
		}>
			<Avatar user={user.id} width="60px" height="60px" />
			<strong>{user.score}</strong>
		</div>
	}

	return <div className={styles.profil_match}>
		<Player pos="left" user={winner} />
		<div className={styles.profil_match_vs}>VS</div>
		<Player pos="right" user={loser} />
	</div>
}

const ProfilHistory = (props: any) => {
	const {user} = props;
	const [history, setHistory] = useState([]);

	useEffect(() => {
		if (!user.id)
			return;
		fetch(`http://c2r2p3.42nice.fr:3030/users/${user.id}/games`)
		.then(res => res.json().then(data => {
			setHistory(data);
		})).catch(err => console.log(err))
	}, [])

	return <div className={styles.profil_history}>
		{history.length > 0 ? history.map((match: any, index: number) => {
			return <ProfilMatch key={index} match={match} />
		}) : <p>Aucun match n'a été trouvé.</p>}
	</div>
}

export default ProfilHistory;
