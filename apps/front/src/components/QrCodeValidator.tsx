import { useState } from "react";
import useSession from "../hooks/useSession";

const QrCodeValidator = (props: any) => {
	const session = useSession("session");
	const [code, setCode] = useState<string | undefined>();
	const [error, setError] = useState<string | undefined>();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let req = "http://c2r2p3.42nice.fr:3030/auth/twofactor/";
		req +=`${session.get("2FA_secret")}/${code}`;
		let res = await fetch(req);
		let data = await res.json();
		if (data.status)	setError("Succeeded");
		else				setError("Wrong code");
		setTimeout(() => setError(undefined), 2000);
	}

	return <form>
		<h2>{error}</h2>
		<input
			type="text"
			value={code}
			onChange={(e) => setCode(e.target.value || e.currentTarget.value)}
		/>
		<button onClick={handleSubmit}>Submit</button>
	</form>
}

export default QrCodeValidator;
