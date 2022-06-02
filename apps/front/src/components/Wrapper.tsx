import Navbar from "./Navigation";

import styles from '../styles/components/Wrapper.module.scss'
import Scenery from './assets/Scenery'

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navbar />
		<Scenery.DefaultScenery />
		{children}
	</main>
}

export default Wrapper;
