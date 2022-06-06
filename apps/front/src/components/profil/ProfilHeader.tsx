import styles from '../../styles/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import useSession from '../../hooks/useSession';
import { useEffect } from 'react';

const ProfilHeader = (props: any) => {
	const {user} = props;


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
	</div>
}

export default ProfilHeader;
