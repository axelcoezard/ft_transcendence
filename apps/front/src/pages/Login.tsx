import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import DefaultScenery from '../components/assets/Scenery'
import styles from '../styles/pages/Login.module.scss'
import Loading from '../components/Loading'
import useSession from '../hooks/useSession'
import LoginButton from '../components/LoginButton'

const Login = (props: any) => {
	const session = useSession("session");
	const [params] = useSearchParams();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const code = params.get("code")
		const {hostname, port} = document.location
		if (code && !session.has("access_token"))
		{
			setLoading(true)
			const request = fetch(`http://localhost:3030/auth/token/${code}`, {
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
		const {hostname, port} = document.location
		const challenge = !session.get("2FA_status") || session.get("2FA_challenge");
		const connected = session.has("access_token")
		if (connected && challenge)
		{
			let first = session.get("first_access") === "true";
			setTimeout(() => {
				session.set("first_access", "false")
				if (first) 	document.location.href = `http://${hostname}:${port}/settings`;
				else 		document.location.href = `http://${hostname}:${port}/home`;
			}, 500)
		}
		if (connected && !challenge)
			document.location.href = `http://${hostname}:${port}/2fa`;
	}, [session])

	return <main>
		<DefaultScenery />
		{loading
		? <Loading title="Connexion" subtitle="Veuillez patienter..."/>
		: <section className={styles.login}>
			<div className={styles.login_container}>
				<h1>TRANSCENDENCE</h1>
				<p>Pong to the extreme!</p>
				<LoginButton />
			</div>
		</section>}
	</main>;
}

export default Login;
