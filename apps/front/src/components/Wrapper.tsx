import { Component } from "react";
import { Navbar, Navlink } from "./Navigation";

import styles from '../styles/Wrapper.module.scss'

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navbar>
			<Navlink href="/home">Home</Navlink>
			<Navlink href="/tchat">Tchat</Navlink>
			<Navlink href="/play">Play</Navlink>
		</Navbar>
		{children}
	</main>
}

export default Wrapper;
