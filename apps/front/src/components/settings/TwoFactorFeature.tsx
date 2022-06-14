import styles from '../../styles/pages/Settings.module.scss'
import QrCode from "../QrCode";
import QrCodeValidator from "../QrCodeValidator";
import useSession from '../../hooks/useSession';
import { useState } from 'react';
import { SettingsFeature } from '../../pages/Settings';

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
		let res = await fetch("http://localhost:3030/auth/twofactor", {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ secret: session.get("2FA_secret") })
		});
		let data = await res.json();
		if (data.status)
			return session.set("2FA_status", false);
		setError("Erreur inattendue");
		setTimeout(() => setError(null), 2000);
	}

	return SettingsFeature("Activer 2FA", "Toujours + de securite", <>
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

export default TwoFactorFeature;
