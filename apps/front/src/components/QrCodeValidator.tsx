import { useState } from "react";
import useSession from "../hooks/useSession";

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
		let req = "http://c2r2p3.42nice.fr:3030/auth/twofactor/";
		req +=`${session.get("2FA_secret")}/${code}`;
		let res = await fetch(req);
		let data = await res.json();
		then(data.status);
	}

	return <form onSubmit={handleSubmit}>
		<input
			type="text"
			value={code || ""}
			placeholder={placeholder}
			onChange={handleChange}
		/>
		<button onClick={handleSubmit}>{"Activer"}</button>
	</form>
}

export default QrCodeValidator;
