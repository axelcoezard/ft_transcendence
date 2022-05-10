import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import Illustration from '../components/Scenery/Illustration'
import { useAppContext } from '../contexts/AppContext'

import styles from '../styles/Home.module.scss'

export default () => {
	const {session} = useAppContext()
	const [params] = useSearchParams();
	const navigate = useNavigate()

	useEffect(() => {
		const code = params.get("code")
		if (code && !session.has("access_token"))
		{
			const request = fetch(`http://localhost:3030/auth/token/${code}`)
			request.then(res => res.json())
			request.then((res: any) => {
				console.log(res)
				//session.set("access_token", res.access_token)
				//session.set("refresh_token", res.refresh_token)
				//session.set("token_type", res.token_type)
				//session.set("expires_in", res.expires_in)
				//session.set("create_at", res.create_at)
				//session.set("scope", res.scope)
			})
			request.catch(e => {})
		}
		return () => {}
	}, [])

	return <div className={styles.container}>
		<Illustration />
	</div>;
}
