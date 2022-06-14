import * as React from "react";
import useSession from "../hooks/useSession";

import styles from '../styles/pages/Login.module.scss'

const LoginButton = () => {
	const session = useSession("session");

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const {hostname, port} = document.location

		e.preventDefault()

		let request = await fetch('http://localhost:3030/auth/authorize', {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
		});

		let response = await request.json();
		document.location.href = response.url;
	}

	return <button className={styles.login_button} onClick={handleClick}>
		<span>Se connecter via</span> <img src="/svgs/42.svg" alt="42" />
	</button>
}

export default LoginButton;
