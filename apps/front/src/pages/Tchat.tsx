import { useEffect, useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import { useAppContext } from '../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import { setMaxListeners } from 'process';

const Tchat = () => {
	const {session, socket} = useAppContext();
	let [messages, setMessages] = useState<any[]>([]);
	let [channels, setChannels] = useState<any[]>([]);
	let [value, setValue] = useState("");
	let {slug} = useParams();

	useEffect(() => {
		socket.emit("channel_join", {
			sender_id: session.get("id"),
			channel_slug: slug
		})
	}, [socket.current, slug])

	socket.on("channel_msg", (res: any) => {
		messages.unshift({
			id: messages.length + 1,
			...res
		})
		setMessages(messages)
	})

	socket.on("channel_set_list", (res: any) => setChannels(res))
	socket.on("channel_set_msg", (res: any) => setMessages(res))

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
						socket.emit("channel_msg", {
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
