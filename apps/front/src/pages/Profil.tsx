import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Profil.module.scss'
import Avatars from '../components/Avatars';
import Ranked from '../components/Ranked'

const Profil = () => {
	const {session} = useAppContext();

	return <main className={styles.profil}>
		<section className={styles.content}>
			<Avatars.PurpleAvatar/> {/* Adapt avatar with back */}
			<div className={styles.general}>
				<h1 className={styles.h1}>{session.get("username")}</h1>
				<div className={styles.ranked}>
					<h2 className={styles.h2}>rank 109</h2>
					<h3 className={styles.h3}>/150</h3>
				</div>
			</div>
		</section>
	</main>
}

export default Profil;