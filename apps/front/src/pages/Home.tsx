import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.scss'
import Scenery from '../components/Scenery/Scenery'
const Home = () => {
	const {session} = useAppContext()
	return <div className={styles.container}>
		<h1>Hello, {session.get("username")}</h1>
	</div>;
}

export default Home;
