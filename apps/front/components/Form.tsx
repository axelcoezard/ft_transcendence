import { useAppContext } from '../contexts/AppContext';
import styles from '../styles/Home.module.css'

const Form = () => {
	const {session} = useAppContext();

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		let request = await fetch('http://localhost:3030/auth');
		let response = await request.json();

		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", response.uid);
			url.searchParams.append("redirect_uri", "http://localhost:3000");
			url.searchParams.append("response_type", "code");
		let tab: any = window.open(
			url.toString(),	"",
			"width=500,height=600,menubar=no,toolbar=no,scrollbars=yes,resizable=no"
		);
	}

	return <>
		<h1 className={styles.title}>
			Welcome to <a>Transcendence</a>
		</h1>

		<button type="button" onClick={handleClick}>Se connecter</button>
		<input
			type="text"
			value={session.get("name")}
			onChange={(e) => session.set("name", e.target.value)}
		/>
		<input
			type="text"
			value={session.get("prout")}
			onChange={(e) => session.set("prout", e.target.value)}
		/>
	</>
}

export default Form;
