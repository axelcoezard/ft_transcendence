import type { NextPage } from 'next'
import Head from 'next/head'
import { MouseEvent } from 'react'
import useSession from '../components/useSession'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const session = useSession("session", {
		connected: false,
		token: ""
	});

	const handleClick = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault()

		let request = await fetch('http://localhost:3030/auth');
		let response = await request.json();

		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", response.uid);
			url.searchParams.append("redirect_uri", "http://localhost:3000");
			url.searchParams.append("response_type", "code");
		let tab: any = window.open(
			url.toString(),	"",
			"width=500,height=600,menubar=no,toolbar=no,scrollbars=yes,resizable=no"
		);
	}

	return <div className={styles.container}>
		<Head>
			<title>Transcendence</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main className={styles.main}>
			<h1 className={styles.title}>
			Welcome to <a href="">Transcendence</a>
			</h1>

			<button type="button" onClick={handleClick}>Se connecter</button>
			<p>Hello {session.get("name")},  {session.get("prout")}</p>
			<input
				type="text"
				value={session.get("name")}
				onChange={(e) => session.set("name", e.target.value)}
			/>
			<input
				type="text"
				value={session.get("prout")}
				onChange={(e) => session.set("prout", e.target.value)}
			/>
		</main>

		<footer className={styles.footer}>
			Made with love by{' '},
			<a href="">acoezard</a>,{' '}
			<a href="">mboy</a> and {' '}
			<a href="">jstopka</a>.
		</footer>
	</div>;
}

export default Home
