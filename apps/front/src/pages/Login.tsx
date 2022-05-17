import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import LoginButton from '../components/LoginButton'
import Illustration from '../components/Scenery/Scenery'
import { useAppContext } from '../contexts/AppContext'

import styles from '../styles/Login.module.scss'

const Login = () => {
	const {session} = useAppContext()
	const [params] = useSearchParams();
	const navigate = useNavigate()

	useEffect(() => {
		const code = params.get("code")
		if (code && !session.has("access_token"))
		{
			const request = fetch(`http://localhost:3030/auth/token/${code}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				}
			})
			request.then(response => response.json().then((res: any) => {
				session.setAll(res)
				navigate("/home")
			}))
			request.catch(e => {})
		}
		return () => {}
	}, [])

	return <div className={styles.login}>
		<Illustration />
		<div className={styles.content}>
			<LoginButton />
		</div>
	</div>;
}

export default Login;