const LoginButton = () => {
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		let request = await fetch('http://localhost:3030/auth/authorize');
		let response = await request.json();

		window.location.href = response.url;
	}

	return <button className="button" onClick={handleClick}>Se connecter</button>
}
export default LoginButton;
