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
	const { code } = router.query

	const requestToken = async (code: string) => {
		let request = await fetch('http://localhost:3030/auth');
		let response = await request.json();

		request = await fetch("https://api.intra.42.fr/oauth/token", {
			method: "POST",
			body: JSON.stringify({
				grant_type: "authorization_code",
				client_id: response.uid,
				client_secret: response.secret,
				code: code,
				redirect_uri: "http://localhost:3000"
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
		response = await request.json();
		console.log(response)
		session.set("access_token", response.access_token)
		session.set("refresh_token", response.refresh_token)
		session.set("token_type", response.token_type)
		session.set("expires_in", response.expires_in)
		session.set("create_at", response.create_at)
		session.set("scope", response.scope)

		//window.location.href = "/"
	}

	useEffect(() => {
		if (code) requestToken(code as string)
	}, [code])

	console.log(session.get("access_token"))

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
