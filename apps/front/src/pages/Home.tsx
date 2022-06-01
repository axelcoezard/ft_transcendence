import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.scss'
import Avatars from '../components/Avatars'
import HomeSelection from "../components/HomeSelection"
import Avatar from '../components/Avatar'

const Home = () => {
	const {session} = useAppContext()

	return <main className={styles.home}>
		<section className={styles.header}>
			<div className={styles.header_container}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>
			<div className={styles.header_avatar}>
				<Avatar user={session.get("id")} width="3.9vw" height="3.9vw"/>
				<p className={styles.text}> {session.get("username")}</p>
			</div>
		</section>
		<section className={styles.game}>
			<HomeSelection.HomeSelectionRandom url="/play/wait"/>
			<HomeSelection.HomeSelectionInvite url="/play/invite" />
			<HomeSelection.HomeSelectionView url="/play/view" />
		</section>
	</main>
}

export default Home;
