import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import Buttons from '../components/Buttons'
import Illustration from '../components/Scenery/Scenery'
import { useAppContext } from '../contexts/AppContext'
import WelcomeToPong from '../components/SVGs/WelcomeToPong'

import styles from '../styles/Login.module.scss'


/* ------------- LOGIN PAGE ------------*/

const Login = (props: any) => {
	const {session} = useAppContext()
	const [params] = useSearchParams();
	const navigate = useNavigate()

	useEffect(() => {
		const code = params.get("code")
		const {hostname, port} = document.location
		if (code && !session.has("access_token"))
		{
			const request = fetch(`http://c2r2p3.42nice.fr:3030/auth/token/${code}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				},
				body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
			})
			request.then(response => response.json().then((res: any) => {
				session.setAll({...res})
			}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
	}, [])

	useEffect(() => {
		if (session.has("access_token"))
			navigate("/home")
	}, [session])

	return <main className={styles.login}>
		<Illustration.LoginBackScenery />
		<section className={styles.header}>
			<div className={styles.header_container}>
				<h1 className={styles.header_h1}>TRANSCENDENCE</h1>
				<h3 className={styles.header_h3}>Pong to the extrem!</h3>
			</div>
		</section>
		<section className={styles.content}>
			<div className={styles.welcome}>
				<h2 className={styles.welcome_h2}>Welcome</h2>
				<div className={styles.welcome_to}>
					<p className={styles.welcome_text}>to</p>
					<div className={styles.welcome_pong}>
						<h2 className={styles.welcome_h2}>P</h2>
						<WelcomeToPong />
						<h2 className={styles.welcome_h2}>NG</h2>
					</div>
				</div>
			</div>
			<Buttons.LoginButton />
		</section>
		<Illustration.LoginFrontScenery />
	</main>;
}

export default Login;
