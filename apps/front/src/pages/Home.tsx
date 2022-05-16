import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import Illustration from '../components/Scenery/Illustration'
import { useAppContext } from '../contexts/AppContext'

import styles from '../styles/Home.module.scss'

const Home = () => {
	const {session} = useAppContext()
	const [params] = useSearchParams();
	const navigate = useNavigate()

	useEffect(() => {
		const code = params.get("code")
		console.log("Session status:", session.has("access_token"))
		console.log("URL token:", code)
		console.log("Fecth URL:", `http://localhost:3030/auth/token/${code}`)
		if (code && !session.has("access_token"))
		{
			const request = fetch(`http://localhost:3030/auth/token/${code}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				}
			})

			request.then(response => response.json().then((res: {
				access_token: string,
				refresh_token: string,
				expires_in: number,
				token_type: string,
				scope: string,
				created_at: number
			}) => {
				//session.set("access_token", res.access_token)
				//session.set("refresh_token", res.refresh_token)
				//session.set("token_type", res.token_type)
				//session.set("expires_in", res.expires_in)
				//session.set("create_at", res.created_at)
				//session.set("scope", res.scope)
				session.setAll(res)
				console.log("Session status:", session.has("access_token"))
			}))
			request.catch(e => {})
		}
		return () => {}
	}, [])

	return <div className={styles.container}>
		<Illustration />
	</div>;
}

export default Home;
