import styles from '../../styles/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import useSession from '../../hooks/useSession';

const ProfilHeader = () => {
	const session = useSession("session");
	return <div className={styles.profil_header}>
		<div className={styles.profil_header_avatar}>
			<Avatar width="120px" height="120px" user={session.get("id")} />
		</div>
		<div className={styles.profil_header_description}>
			<h1>{session.get("username")}</h1>
			<div className={styles.profil_header_elo}>
				<strong>{session.get("ELO_score")}</strong> ELO
			</div>
		</div>
	</div>
}

export default ProfilHeader;
