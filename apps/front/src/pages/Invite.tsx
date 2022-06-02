import styles from "../styles/Invite.module.scss"
import { useState } from 'react'

const Invite = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
	}

	return <div className={styles.invite}>
		<h1 className={styles.invite_h1}>INVITE</h1>
		<p>Défis un joueur à une partie de Pong</p>
		<div className={styles.invite_content}>
			<input className={styles.invite_input}
				type="text"
				value={value}
				placeholder="Enter private invite code"
				onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
			}}/>
			<button className={styles.invite_button}
				onClick={handleSubmit}
				onSubmit={handleSubmit}>
				<p className={styles.invite_text}>JOIN</p>
			</button>
		</div>
	</div>
}

export default Invite;
