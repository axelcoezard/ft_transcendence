import { cloneElement, useEffect, useRef, useState } from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import io from 'socket.io-client'

import styles from '../styles/Home.module.scss'
import useSocket from '../hooks/useSocket'
import Pong from '../components/Pong'
import Tchat from '../components/Tchat'

const Rtc = () => {

	return <div className={styles.container}>
		<Navbar>
			<Navlink href="/">Home</Navlink>
			<Navlink href="/">About</Navlink>
		</Navbar>
		<main className={styles.main}>
			<Pong />
			<Tchat />
		</main>
	</div>;
}

export default Rtc;
