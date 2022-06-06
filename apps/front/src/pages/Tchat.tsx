import { useEffect, useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import WriteIcon from '../components/assets/SVGs/WriteIcon';
import SendIcon from '../components/assets/SVGs/SendIcon';
import Message from "../components/tchat/Message";
import Conversations from "../components/tchat/Conversations";
import BinIcon from '../components/assets/SVGs/BinIcon';
import PlusIcon from '../components/assets/SVGs/PlusIcon';
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';
import DropdownMenu from '../components/tchat/DropdownMenu';
import useSession from '../hooks/useSession';

const Tchat = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const [messages, setMessages] = useState<any[]>([]);
	const [channels, setChannels] = useState<any[]>([]);
	const [value, setValue] = useState("");
	let {slug} = useParams();

	useEffect(() => {
		if (socket.ready)
		{
			socket.emit("join", "chat", slug, {
				id: session.get("id"),
				username: session.get("username")
			})
			socket.on("chat.channel", (res: any) => setChannels(res))
			socket.on("chat.msg", (res: any) => setMessages(res))
		}
	}, [socket.ready, slug])

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (value.length < 1
			|| value.length > 255
			|| value.match(/^\s+$/)
		) return;

		socket.emit("msg", "chat", slug, {
			id: session.get("id"),
			username: session.get("username"),
			channel_slug: slug,
			type: "text",
			value: value
		})
		setValue("")
	}

	return <section className={styles.tchat}>

	</section>
}

export default Tchat;

/*
<input
					className={styles.conversation_send_input}
					type="text"
					value={value}
					placeholder="Type your message here"
					onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
				}}/>
				<button className={styles.conversation_send_button}
					onClick={handleSubmit}
					onSubmit={handleSubmit}>
					<SendIcon width="1.5vw" height="1.5vw" />
				</button>

				{messages.map((message: any, index: number) => <Message
					key={index}
					type={message.type}
					origin={{
						id: message.sender_id,
						username: message.sender_username
					}}
					value={message}
				/>)}
*/
