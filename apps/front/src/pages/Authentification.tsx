import { useState } from "react";
import useSession from "../hooks/useSession";
import styles from "../styles/pages/Authentification.module.scss";
import DefaultScenery from "../components/assets/Scenery";
import QrCodeValidator from "../components/QrCodeValidator";

const AuthentificationFrom = () => {
	const session = useSession("session");
	const [code, setCode] = useState<string | null>();
	const [error, setError] = useState<string | null>();

	const handleChange = (e: any) => {
		let code = e.target.value || e.currentTarget.value;
		let lastChar = parseInt(code.slice(-1));
		if (code === "")
			setCode("");
		if (lastChar in [0,1,2,3,4,5,6,7,8,9] && code.length <= 6)
			setCode(code)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let res = await fetch("http://c2r2p3.42nice.fr:3030/auth/twofactor", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				secret: session.get("2FA_secret"),
				code: code
			})
		});
		let data = await res.json();
	}

	return <form onSubmit={handleSubmit}>
		<input
			className={styles.settings_feature_input_code}
			type="text"
			value={code || ""}
			placeholder={"Code secret"}
			onChange={handleChange}
		/>
		<button onClick={handleSubmit}>{"Activer"}</button>
	</form>
}


const Authentification = () => {
	return <main>
		<DefaultScenery />
		<div className={styles.authentification}>
			<h1 className={styles.authentification_header}>Authentification</h1>
			{/* <QrCodeValidator> */}
		</div>

	</main>
}

export default Authentification;
