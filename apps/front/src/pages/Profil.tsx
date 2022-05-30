import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Profil.module.scss'
import Avatars from '../components/Avatars';
import Ranked from '../components/Ranked'
import ProgressBar from '../components/ProgressBar';
import VictoryCrown from '../components/SVGs/VictoryCrown';

const Profil = () => {
	const {session} = useAppContext();

	return <main className={styles.profil}>
		<section className={styles.content}>
			<Avatars.PurpleAvatar width="3.9vw" height="3.9vw"/> {/* BACK */}

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
{/* 
			<History /> */}
		</section>
	</main>
}

export default Profil;
