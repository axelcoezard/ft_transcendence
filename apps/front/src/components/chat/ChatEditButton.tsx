import { useNavigate } from "react-router-dom"

const ChatEditButton = (props: any) => {
	const navigate = useNavigate();
	const {slug} = props;

	const handleClick = () => {
		navigate(`/chat/${slug}/edit`);
	}

	return <button onClick={handleClick}>Editer</button>
}

export default ChatEditButton
