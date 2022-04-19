import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import Pong from '../components/Pong'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
	return <div className={styles.container}>
		<Head>
			<title>Transcendence</title>
		</Head>
		<Navbar>
			<Navlink href="/">Home</Navlink>
			<Navlink href="/">About</Navlink>
		</Navbar>
		<main className={styles.main}>
			<h1 className={styles.title}>
				Welcome to <a>Transcendence</a>
			</h1>
			<Pong />
		</main>
	</div>;
}

export default Home
