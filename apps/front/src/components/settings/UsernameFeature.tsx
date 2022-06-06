import styles from '../../styles/Settings.module.scss'
import QrCode from "../QrCode";
import QrCodeValidator from "../QrCodeValidator";
import useSession from '../../hooks/useSession';
import { useState } from 'react';
import { SettingsFeature } from '../../pages/Settings';

const UsernameFeature = () => {
	const session = useSession("session");
	const [status, setStatus] = useState<string | null>();
	const [username, setUsername] = useState<string | null>();

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		let res = await fetch(
			`http://c2r2p3.42nice.fr:3030/users/${session.get("id")}/username`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username })
			}
		).then(res => res.json())

		if (res.error)
			return setStatus(res.error)
		setStatus(`Votre pseudo est maintenant: ${username}`)
		session.set("username", username)
		setUsername(null)
	}

	return SettingsFeature("Changer de username", "et pourquoi pas?", <form>
		<p className={styles.settings_feature_error}>{status}</p>
		<input
			type="text"
			placeholder="Elon musk"
			value={username || ""}
			className={styles.settings_feature_input}
			onChange={(e) => setUsername(e.target.value || e.currentTarget.value)}
		/>
		 <button
			onClick={handleSubmit}
			className={styles.settings_feature_activate}>
			Changer
		</button>
	</form>)
}

export default UsernameFeature;
