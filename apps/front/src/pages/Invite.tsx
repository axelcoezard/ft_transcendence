import styles from "../styles/Invite.module.scss"
import { useState } from 'react'

const Invite = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
	}

	return <section className={styles.invite}>
		<div className={styles.invite_header}>
			<h1>INVITE</h1>
			<p>Rejoignez la partie d'un ami qui vous defie</p>
		</div>
		<form className={styles.invite_form}>
			<input className={styles.invite_input}
				type="text"
				value={value}
				placeholder="Code d'invitation"
				onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
			}}/>
			<button className={styles.invite_button}
				onClick={handleSubmit}
				onSubmit={handleSubmit}>
				<p className={styles.invite_text}>Rejoindre</p>
			</button>
		</form>
	</section>
}

export default Invite;
