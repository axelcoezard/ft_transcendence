import { useState } from "react";
import useSession from "../hooks/useSession";
import styles from "../styles/pages/2FA.module.scss";
import settingsStyles from "../styles/pages/Settings.module.scss";
import DefaultScenery from "../components/assets/Scenery";
import QrCodeValidator from "../components/QrCodeValidator";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const TwoFactorAuth = () => {
	const session = useSession("session");
	const [error, setError] = useState<string | null>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleError = (error: string) => {
		setError(error);
		setTimeout(() => setError(null), 2000);
	}

	const handleValidation = (status: boolean) => {
		if (status)
		{
			setLoading(true)
			session.set("2FA_challenge", true);
			setTimeout(() => navigate("/home"), 1000);
		}
		else handleError("Code invalide");
	}

	return <main>
		<DefaultScenery />
		{loading ? <Loading
			title="2-Factor Auth"
			subtitle="Vérification du code..."
		/> : <div className={styles.authentification}>
			<h1>2-Factor Auth</h1>
			<p>Veuillez entrer votre code secret de 2FA.</p>
			{error && <strong className={settingsStyles.settings_feature_error}>{error}</strong>}
			<QrCodeValidator then={handleValidation} placeholder="Code secret" />
		</div>}

	</main>
}

export default TwoFactorAuth;
