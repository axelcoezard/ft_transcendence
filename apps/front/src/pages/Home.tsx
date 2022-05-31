import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.scss'
import Avatars from '../components/Avatars'
import HomeSelection from "../components/HomeSelection"

/* -------- HOME LINKS TO PONG ---------*/


const Home = () => {
	const {session} = useAppContext()

	return <main className={styles.home}>
		<section className={styles.header}>
			<div className={styles.header_container}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>
			<div className={styles.header_avatar}>
				<Avatars.PurpleAvatar width="3.9vw" height="3.9vw"/> {/* TO-DO: Link to profil */}
				<p className={styles.text}> {session.get("username")}</p>
			</div>
		</section>
		<section className={styles.game}>
			<HomeSelection.HomeSelectionRandom url="/play/wait"/>
			<HomeSelection.HomeSelectionInvite />
			<HomeSelection.HomeSelectionView />
		</section>
	</main>
}

export default Home;
