import { cloneElement, useEffect, useRef, useState } from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import io from 'socket.io-client'

import styles from '../styles/Home.module.scss'
import useSocket from '../hooks/useSocket'

const Rtc = () => {
	let [messages, setMessages] = useState<any[]>([]);
	let [value, setValue] = useState("");
	let [id, setId] = useState(0);

	let socket = useSocket("http://localhost:3030")
	socket.on("id", ({id}: {id: any}) => setId(id))
	socket.on("privmsg", (message: any) => {
		messages.push({
			id: messages.length+1,
			...message
		})
		setMessages([...messages])
	})

	return <div className={styles.container}>
		<Navbar>
			<Navlink href="/">Home</Navlink>
			<Navlink href="/">About</Navlink>
		</Navbar>
		<main className={styles.main}>
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
	</div>;
}

export default Rtc;
