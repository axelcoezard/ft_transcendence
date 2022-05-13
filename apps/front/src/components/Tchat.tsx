import { useState } from 'react'

import styles from '../styles/Home.module.scss'
import useSocket from '../hooks/useSocket'

const Tchat = () => {
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState("");
	let [id, setId] = useState(0);

	let socket = useSocket("http://localhost:3030/tchat")
	socket.on("id", ({id}: {id: any}) => setId(id))
	socket.on("privmsg", (message: any) => {
		messages.push({
			id: messages.length+1,
			...message
		})
		setMessages([...messages])
	})

	return <main className={styles.main}>
		<h1 className={styles.title}>{id}</h1>
		<ul className={styles.tchat}>
		{
			messages.map((message: any, index: number) => <li key={index}>
				<b>{message.sender} </b>
				{message.value}
			</li>)
		}
		</ul>
		<input type="text" value={value} onChange={(e: any) => {
			setValue(e.currentTarget.value || e.target.value)
		}}/>
		<button onClick={(e) => {
			socket.emit("privmsg", {value})
		}}>Send</button>
	</main>
}

export default Tchat;
