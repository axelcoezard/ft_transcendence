import { useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import { useAppContext } from '../contexts/AppContext';

const Tchat = () => {
	const {session, socket} = useAppContext();
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState("");

	socket.on("privmsg", (message: any) => {
		messages.unshift({
			id: messages.length+1,
			...message
		})
		setMessages([...messages])
	})

	return (
		<div className={styles.tchat}>
			<ul className={styles.tchat_list}></ul>
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
						socket.emit("privmsg", {
							sender_id: session.get("id"),
							sender_username: session.get("username"),
							recipient_table: "channel",
							recipient_id: 0,
							type: "text",
							value: value
						})
					}}>Send</button>
				</div>
			</div>
		</div>
	)
}

export default Tchat;
