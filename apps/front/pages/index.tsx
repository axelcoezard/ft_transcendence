import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import Pong from '../components/Pong'
import { useAppContext } from '../contexts/AppContext'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
	const {session} = useAppContext()
	const router = useRouter()

	const requestToken = (code: string) => {
		fetch(`http://localhost:3030/auth/token/${code}`)
		.then(res => res.json())
		.then(res => {
			session.set("access_token", res.access_token)
			session.set("refresh_token", res.refresh_token)
			session.set("token_type", res.token_type)
			session.set("expires_in", res.expires_in)
			session.set("create_at", res.create_at)
			session.set("scope", res.scope)

			//window.location.href = "/"
			console.log("Chill", session.get("access_token"))
		})
		.catch(err => console.error(err))
	}

	if (router.query.code)
		requestToken(router.query.code as string)


	return <div className={styles.container}>
		<Head>
			<title>Transcendence</title>
		</Head>
		<Navbar>
			<Navlink href="/">Home</Navlink>
			<Navlink href="/">About</Navlink>
		</Navbar>
		<main className={styles.main}>
			<input
				value={session.get("access_token")}
				onChange={(e: any) => session.set("access_token", e.target.value)}
			/>
			<h1 className={styles.title}>
				Welcome to <a>Transcendence</a>
			</h1>
			<Pong />
		</main>
	</div>;
}

export default Home
