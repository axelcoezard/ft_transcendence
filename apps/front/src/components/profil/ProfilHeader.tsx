import styles from '../../styles/pages/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import useSession from '../../hooks/useSession';
import { useEffect, useState } from 'react';

const ProfilHeader = (props: any) => {
	const {user} = props;
	const [stats, setStats] = useState<any>({});
	const session = useSession("session");

	const fetchStats = async () => {
		const response = await fetch(`http://c2r2p3.42nice.fr:3030/users/${user.id}/stats`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		if (data) setStats(data)
	}

	useEffect(() => {
		if (user.id)
			fetchStats();
	}, [user.id])

	return <div className={styles.profil_header}>
		<div className={styles.profil_header_avatar}>
			{user.id ? <Avatar width="120px" height="120px" user={user.id} /> : null}
		</div>
		<div className={styles.profil_header_description}>
			<h1>{user.username || "Not Found"}</h1>
			{user.ELO_score ? <div className={styles.profil_header_elo}>
				<strong>{user.ELO_score}</strong> ELO
			</div> : null}
		</div>
		<ul className={styles.profil_header_stats}>
			<li>
				<strong>{stats.nb_games || 0}</strong>
				<span>Parties</span>
			</li>
			<li>
				<strong>{stats.nb_wins || 0}</strong>
				<span>Victoires</span>
			</li>
			<li>
				<strong>{stats.nb_loses || 0}</strong>
				<span>Defaites</span>
			</li>
		</ul>
	</div>
}

export default ProfilHeader;
