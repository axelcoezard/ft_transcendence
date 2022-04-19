import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Form from '../components/Form'
import Pong from '../components/Pong'
import { AppProvider } from '../contexts/AppContext'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return <div className={styles.container}>
		<Head>
			<title>Transcendence</title>
		</Head>

		<AppProvider>
			<main className={styles.main}>
				<Form />
				<Pong />
			</main>
		</AppProvider>
	</div>;
}

export default Home
