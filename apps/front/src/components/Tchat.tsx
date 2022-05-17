import { useState } from 'react'

import styles from '../styles/Home.module.scss'
import { useAppContext } from '../contexts/AppContext';

const Tchat = () => {
	const {session, socket} = useAppContext();
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState("");

	socket.on("privmsg", (message: any) => {
		messages.push({
			id: messages.length+1,
			...message
		})
		setMessages([...messages])
	})

	return <main className={styles.main}>
		<ul className={styles.tchat}>
		{
			messages.map((message: any, index: number) => <li key={index}>
				<b>{message.username} </b>
				{message.value}
			</li>)
		}
		</ul>
		<input type="text" value={value} onChange={(e: any) => {
			setValue(e.currentTarget.value || e.target.value)
		}}/>
		<button onClick={(e) => {
			socket.emit("privmsg", {
				username: session.get("username"), value
			})
		}}>Send</button>
	</main>
}

export default Tchat;
