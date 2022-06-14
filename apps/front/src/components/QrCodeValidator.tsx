import { useState } from "react";
import useSession from "../hooks/useSession";
import styles from "../styles/pages/Settings.module.scss";

const QrCodeValidator = ({then, placeholder}: {
	then: (status: boolean) => void,
	placeholder: string
}) => {
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
		let res = await fetch("http://localhost:3030/auth/twofactor", {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				secret: session.get("2FA_secret"),
				code: code
			})
		});
		let data = await res.json();
		then(data.status);
	}

	return <form onSubmit={handleSubmit}>
		<input
			className={styles.settings_feature_input_code}
			type="text"
			value={code || ""}
			placeholder={placeholder}
			onChange={handleChange}
		/>
		<button onClick={handleSubmit}>{"Activer"}</button>
	</form>
}

export default QrCodeValidator;
