import { useNavigate } from "react-router-dom"
import styles from '../../styles/pages/Chat.module.scss'
import { FaCog } from 'react-icons/fa';

const ChatEditButton = (props: any) => {
	const navigate = useNavigate();
	const {slug} = props;

	const handleClick = () => {
		navigate(`/chat/${slug}/edit`);
	}

	return <button
		onClick={handleClick}
		className={styles.chat_header_settings_button}>
		<FaCog />
	</button>
}

export default ChatEditButton
