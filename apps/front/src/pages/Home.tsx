import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.scss'

const Home = () => {
	const {session} = useAppContext()
	return <div className={styles.container}>
		{session.has("access_token") ? <h1>Connected</h1> : <h1>Not Connected</h1>}
	</div>;
}

export default Home;
