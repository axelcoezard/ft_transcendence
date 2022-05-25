import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Profil.module.scss'
import Avatars from '../components/Avatars';
import Ranked from '../components/Ranked'
import ProgressBar from '../components/ProgressBar';

const VictoryCrown = () => {
	return <svg className={styles.victory_crown} viewBox="0 0 25 20">
		<path fill="#fff" fillOpacity="0.5" stroke="#fff" strokeWidth="2" d="M1.415 2.968h0l4.757 4.185.78.687.657-.807 4.237-5.217s0 0 0 0a.25.25 0 01.088-.069l-.423-.9.423.9a.25.25 0 01.303.073h0l4.044 5.195.646.831.797-.689 4.91-4.244s0 0 0 0a.25.25 0 01.283-.03l.478-.874-.478.874a.25.25 0 01.127.255s0 0 0 0l-1.75 12.077H2.78L1.003 3.193h0a.25.25 0 01.412-.225zm1.6 15.497h18v.25a.25.25 0 01-.25.25h-17.5a.25.25 0 01-.177-.073l-.7.7.7-.7a.25.25 0 01-.073-.177v-.25z"></path>
	</svg>
}


const Profil = () => {
	const {session} = useAppContext();

	return <main className={styles.profil}>
		<section className={styles.content}>
			<Avatars.PurpleAvatar/> {/* BACK */}
			
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
				<VictoryCrown />
				<p className={styles.text}>8 victories</p>  {/* BACK */}
				<p className={styles.text}>4 defeats</p> {/* BACK */}
			</div>
		</section>
	</main>
}

export default Profil;