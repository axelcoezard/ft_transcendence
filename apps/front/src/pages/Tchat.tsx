import { useEffect, useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';

const Tchat = () => {
	const {session, socket} = useAppContext();
	const [messages, setMessages] = useState<any[]>([]);
	const [channels, setChannels] = useState<any[]>([]);
	const [value, setValue] = useState("");
	const {slug} = useParams();

	useEffect(() => {
		if (socket.ready)
		{
			socket.emit("join", "chat", slug)
			socket.on("chat.msg", (res: any) => {
				let tmp: any[] = [{
					id: messages.length + 1,
					...res
				}].concat([...messages]);
				console.log(tmp)
				setMessages(tmp)
			})
		}
	}, [socket.ready])

	//socket.on("channel_set_list", (res: any) => setChannels(res))
	//socket.on("channel_set_msg", (res: any) => setMessages(res))

	return (
		<div className={styles.tchat}>
			<ul className={styles.tchat_list}>
				{ channels.map((channel: any, index: number) => <li key={index}>
					<Link to={`/tchat/${channel.slug}`}>Channel {channel.slug}</Link>
				</li>) }
			</ul>
			<div className={styles.tchat_container}>
				<ul className={styles.tchat_messages}>
					{ messages.map((message: any, index: number) => <li key={index}>
						<b>{message.sender_username} </b>
						{message.value}
					</li>) }
				</ul>
				<div className={styles.tchat_form}>
					<input
						className={styles.tchat_input}
						type="text"
						value={value}
						onChange={(e: any) => {
							setValue(e.currentTarget.value || e.target.value)
					}}/>
					<button
						className={styles.tchat_button}
						onClick={(e) => {
						socket.emit("msg", "chat", slug, {
							sender_id: session.get("id"),
							sender_username: session.get("username"),
							channel_slug: slug,
							type: "text",
							value: value
						})
						setValue("")
					}}>Send</button>
				</div>
			</div>
		</div>
	)
}

export default Tchat;
