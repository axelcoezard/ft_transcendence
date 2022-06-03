import styles from '../styles/Settings.module.scss'
import QrCode from "../components/QrCode";
import QrCodeValidator from "../components/QrCodeValidator";
import useSession from '../hooks/useSession';
import { useState } from 'react';

const SettingsFeature = (title: string, children: JSX.Element) => {
	return <li className={styles.settings_feature}>
		<div className={styles.settings_feature_title}>
			<h2>{title}</h2>
			<p>Toujours + de securite</p>
		</div>
		<div className={styles.settings_feature_body}>{children}</div>
	</li>
}

const TwoFactorFeature = () => {
	const session = useSession("session");
	const [error, setError] = useState<string | null>();

	const handleActivation = async (status: boolean) => {
		if (status)
			return session.set("2FA_status", true);
		setError("Code invalide")
		setTimeout(() => setError(null), 2000);
	}

	const handleDesactivation = async () => {
		let res = await fetch("http://c2r2p3.42nice.fr:3030/auth/twofactor", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ secret: session.get("2FA_secret") })
		});
		let data = await res.json();
		if (data.status)
			return session.set("2FA_status", false);
		setError("Erreur inattendue");
		setTimeout(() => setError(null), 2000);
	}

	return SettingsFeature("2Factor Auth", <>
		<QrCode size="150px" />
		{error && <strong className={styles.settings_feature_error}>{error}</strong>}
		{!session.get("2FA_status") ? <QrCodeValidator
			then={handleActivation}
			placeholder="Code secret"
		/> : <button
			onClick={handleDesactivation}
			className={styles.settings_feature_desactivate}>
			Desactiver
		</button>}
	</>)
}

const Settings = () => {
	return <main className={styles.settings}>
		<div className={styles.settings_header}>
			<div className={styles.settings_header_container}>
				<h1>Settings</h1>
			</div>
		</div>
		<ul className={styles.settings_features}>
			<TwoFactorFeature />
		</ul>
	</main>
}

export default Settings;
