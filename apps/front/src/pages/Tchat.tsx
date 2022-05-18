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
			<ul className={styles.tchat_list}>

			</ul>
			<div className={styles.tchat_container}>
				<ul className={styles.tchat_messages}>
					{ messages.map((message: any, index: number) => <li key={index}>
						<b>{message.username} </b>
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
							username: session.get("username"), value
						})
					}}>Send</button>
				</div>
			</div>
		</div>
	)
}

export default Tchat;
