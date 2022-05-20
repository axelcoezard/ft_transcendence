import { Component } from "react";
import Navbar from "./Navigation";

import styles from '../styles/Wrapper.module.scss'
import Scenery from '../components/Scenery/Scenery'

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navbar />
		<Scenery.DefaultScenery />
		{children}
	</main>
}

export default Wrapper;
