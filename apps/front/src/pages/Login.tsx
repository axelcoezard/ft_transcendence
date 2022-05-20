import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import Buttons from '../components/Buttons'
import Illustration from '../components/Scenery/Scenery'
import { useAppContext } from '../contexts/AppContext'

import styles from '../styles/Login.module.scss'


/* ------------- LOGIN SVG -------------*/


const WelcomeToPong = () => {
	return  <svg className={styles.welcome_svg}>
		<mask id="mask0_706_1066" style={{ maskType: "alpha" }} x="0" y="0" maskUnits="userSpaceOnUse">
			<circle cx="20.308" cy="20" r="20" fill="#fff"> </circle>
		</mask>
		<g mask="url(#mask0_706_1066)">
			<circle cx="20.308" cy="20" r="20" fill="url(#paint0_linear_706_1066)"> </circle>
			<path fill="#492D6A" fillOpacity="0.25" d="M-5.539 15.887s1.494 2.62 2.814 3.967c1.262 1.289 2.39 1.576 3.721 2.796 2.672 2.449 3.315 4.62 5.507 7.522 2.218 2.937 2.962 5.072 5.786 7.427 1.409 1.175 2.363 1.656 3.943 2.641 1.532.956 4.017 2.334 4.017 2.334l-3.74 3.614s-4.528-3.341-6.857-6.041c-2.409-2.793-2.7-5.287-5.163-8.03-2.418-2.692-4.896-3.085-7.232-5.853-1.901-2.253-.901-5.675-3.989-6.526-.904-.25-2.546-.237-2.546-.237l3.74-3.614zM-3.003 8.65s2.911 2.286 4.413 4.082c1.436 1.718 1.763 3.05 3.124 4.829 2.731 3.57 5.14 4.797 8.369 7.932 3.268 3.174 5.637 4.506 8.266 8.225 1.312 1.855 1.852 3.038 2.955 5.04 1.07 1.943 2.615 5.054 2.615 5.054l3.97-3.358s-3.733-5.862-6.74-9.104c-3.11-3.355-5.873-4.261-8.929-7.665-2.999-3.342-3.453-6.215-6.536-9.482-2.509-2.66-6.288-2.332-7.255-5.996C.966 7.133.967 5.292.967 5.292l-3.97 3.359zM38.147 39.978s-2.61-3.883-4.657-6.05c-1.958-2.075-3.473-2.8-5.5-4.806-4.068-4.025-5.474-7.058-9.051-11.526-3.62-4.522-5.146-7.539-9.382-11.49-2.114-1.97-3.46-2.895-5.74-4.671C1.603-.288-1.938-2.859-1.938-2.859L1.86-6.412S8.536-.645 12.234 3.6c3.826 4.393 4.868 7.738 8.75 12.082 3.81 4.265 7.077 5.548 10.802 9.886 3.033 3.531 2.678 7.685 6.846 9.755 1.22.607 3.312 1.1 3.312 1.1l-3.797 3.554zM18.861-4.112s1.494 2.619 2.813 3.966c1.263 1.289 2.39 1.576 3.722 2.796 2.672 2.449 3.315 4.62 5.507 7.522 2.218 2.937 2.962 5.072 5.786 7.427 1.409 1.175 2.363 1.656 3.943 2.641 1.532.956 4.017 2.335 4.017 2.335l-3.74 3.613s-4.528-3.341-6.857-6.041c-2.409-2.793-2.7-5.287-5.163-8.03-2.418-2.692-4.896-3.085-7.232-5.853-1.902-2.253-.901-5.675-3.989-6.526-.904-.25-2.546-.237-2.546-.237l3.74-3.613z"> </path>
			<circle cx="20.308" cy="20" r="20" fill="url(#paint1_radial_706_1066)"> </circle>
		</g>
		<defs>
			<linearGradient id="paint0_linear_706_1066" x1="0.308" x2="40.308" y1="0" y2="40" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<radialGradient id="paint1_radial_706_1066" cx="0" cy="0" r="1" gradientTransform="rotate(127.342 13.337 8.654) scale(46.1616 100.063)" gradientUnits="userSpaceOnUse">
				<stop stopColor="#fff" stopOpacity="0.5"></stop>
				<stop offset="0.371" stopColor="#7B61FF" stopOpacity="0"></stop>
			</radialGradient>
		</defs>
	</svg>
}

/* ------------- LOGIN PAGE ------------*/

const Login = (props: any) => {
	const {session} = useAppContext()
	const [params] = useSearchParams();
	const navigate = useNavigate()

	useEffect(() => {
		const code = params.get("code")
		if (code && !session.has("access_token"))
		{
			console.log("test 1")
			const request = fetch(`http://localhost:3030/auth/token/${code}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				}
			})
			request.then(response => response.json().then((res: any) => {
				session.setAll(res)
			}))
			request.catch(e => {console.error(e)})
		}

		if (session.has("access_token"))
			navigate("/home")

		return () => {}
	}, [])

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
