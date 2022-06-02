import styles from '../styles/Profil.module.scss'
import ProfilHeader from '../components/profil/ProfilHeader';
import ProfilHistory from '../components/profil/ProfilHistory';

const Profil = () => {
	return <main className={styles.profil}>
		<ProfilHeader />
		<ProfilHistory />
	</main>
}

export default Profil;
