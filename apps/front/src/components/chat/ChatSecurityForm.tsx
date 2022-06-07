const ChatSecurityForm = (props: any) => {
	const {setPassword, password} = props;

	return <input
		type="password"
		placeholder="Mot de passe"
		onChange={(e: any) => setPassword(e.target.value)}
		value={password || ""}
	/>
}

export default ChatSecurityForm;
