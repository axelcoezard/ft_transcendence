const ChatInfoForm = (props: any) => {
	const {setName, name} = props;

	return <input
		type="text"
		placeholder="Nom du tchat"
		onChange={(e: any) => setName(e.target.value)}
		value={name || ""}
	/>
}

export default ChatInfoForm;
