import { cloneElement, useEffect, useRef, useState } from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import io from 'socket.io-client'

import styles from '../styles/Home.module.scss'
import { useAppContext } from '../contexts/AppContext'

const Rtc = () => {
	const [messages, setMessages] = useState<any>([]);
	const [value, setValue] = useState("");
	const socket = useRef<any>();
	const [id, setId] = useState(0);

	const addMessage = (message: any) => {
		setMessages([...messages, message]);
		console.log(message);
	}

	useEffect(() => {
		const _socket = io("http://localhost:3030");
		setMessages([])
		_socket.on("id", ({id}: {id: any}) => setId(id))
		_socket.on("privmsg", (message: any) => addMessage(message))
		socket.current = _socket;
	}, [])

	const sendMessage = async (e: any) => {
		e.preventDefault()
		socket.current.emit("privmsg", {value});
	}

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
			<button onClick={sendMessage}>Send</button>

		</main>
	</div>;
}

export default Rtc;
