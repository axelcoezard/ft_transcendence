import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Profil.module.scss'
import Ranked from '../components/Ranked'
import ProgressBar from '../components/ProgressBar';
import VictoryCrown from '../components/SVGs/VictoryCrown';
import Avatar from '../components/Avatar';
import { useEffect, useState } from 'react';
import useSession from '../hooks/useSession';
import History, { HistoryMatch } from '../components/History';

const Profil = () => {
	const session = useSession("session");
	const [history, setHistory] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3030/users/14/games")
		.then(res => res.json().then(data => {
			setHistory(data);
		})).catch(err => console.log(err))
	}, [])

	const getWinnerAndLoser = (match: any): [any, any] => {
		let winner;
		let loser;
		if (match.user1_score >= match.user2_score)
		{ winner = match.user1_id; loser = match.user2_id; }
		else
		{ winner = match.user2_id; loser = match.user1_id; }
		return [winner, loser];
	}

	return <main className={styles.profil}>
		<section className={styles.content}>
			<Avatar user={session.get("id")} width="3.9vw" height="3.9vw"/>

			<div className={styles.general}>
				<Ranked.MediumRanked />
				<div className={styles.username_ranked}>
					<h1 className={styles.h1}>{session.get("username")}</h1>
					<div className={styles.ranked}>
						<h2 className={styles.h2}>rank 109</h2>
						<h3 className={styles.h3}>/150</h3>
					</div>
				</div>
			</div>

			<ProgressBar progress={60} bgcolor="#60B5E7" /> {/* BACK */}

			<div className={styles.victories_defeats}>
				<VictoryCrown winner="true" />
				<p className={styles.text}>8 victories</p>  {/* BACK */}
				<p className={styles.text}>4 defeats</p> {/* BACK */}
			</div>

			<History>
				{history.map((match: any, index: number) => {
					let [winner, loser] = getWinnerAndLoser(match);
					return <HistoryMatch key={index} winner={winner} opponant={loser} />
				})}
			</History>
		</section>
	</main>
}

export default Profil;
