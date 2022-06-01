import * as React from "react";

import styles from '../styles/Buttons.module.scss'

const FourtyTwoLogo = (props:any) => {
	return  <svg className={styles.login_button_icon} fill="none" viewBox="0 0 39 28">
		<path fill="url(#paint0_linear_685_1162)" d="M24.75.75h13.5v6.625L31.5 14.5v7l6.75-7v7h-13.5v-7l6.75-7.125V.75l-6.75 6.625V.75z"> </path>
		<path stroke="url(#paint1_linear_685_1162)" strokeLinecap="round" d="M31.5.75h-6.75v6.625L31.5.75zm0 0h6.75v6.625L31.5 14.5v7m0-20.75v6.625L24.75 14.5v7h6.75m0 0h6.75v-7l-6.75 7z"> </path>
		<path fill="url(#paint2_linear_685_1162)" stroke="url(#paint3_linear_685_1162)" strokeLinecap="round" d="M1.25 14.375v5.75h13.5v7.125h7V14.375H8L21.75.75h-7L1.25 14.375z"> </path>
		<defs>
			<linearGradient id="paint0_linear_685_1162" x1="27.561" x2="35.59" y1="11.146" y2="11.146" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="0.49" stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#A4EDE1"></stop>
			</linearGradient>
			<linearGradient id="paint1_linear_685_1162" x1="27.561" x2="35.59" y1="11.146" y2="11.146" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="0.49" stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#A4EDE1"></stop>
			</linearGradient>
			<linearGradient id="paint2_linear_685_1162" x1="5.519" x2="17.712" y1="14.027" y2="14.027" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="0.49" stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#A4EDE1"></stop>
			</linearGradient>
			<linearGradient id="paint3_linear_685_1162" x1="5.519" x2="17.712" y1="14.027" y2="14.027" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="0.49" stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#A4EDE1"></stop>
			</linearGradient>
		</defs>
	</svg>
}

const LoginButton = () => {
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const {hostname, port} = document.location

		e.preventDefault()

		let request = await fetch('http://c2r2p3.42nice.fr:3030/auth/authorize', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
			},
			body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
		});

		let response = await request.json();
		document.location.href = response.url;
	}

	return <button className={styles.login_button} onClick={handleClick}>
		Login through <FourtyTwoLogo /> portal
	</button>
}

const ExportButtons = {
	LoginButton
};

export default ExportButtons;
