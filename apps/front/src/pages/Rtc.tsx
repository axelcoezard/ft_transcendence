
import { useEffect, useRef, useState } from 'react'
import { Navbar, Navlink } from '../components/Navigation'
import io from 'socket.io-client'

import styles from '../styles/Home.module.scss'
import { useAppContext } from '../contexts/AppContext'

const Rtc = () => {
	const {session} = useAppContext();
	const [value, setValue] = useState("");
	const socket = useRef<any>();

	const [id, setId] = useState(Math.floor(Math.random() * 100000000).toString(16));
	const [to, setTo] = useState("");

	const addMessage = (value: string) => {

	}

	useEffect(() => {
		const _socket = io("http://localhost:3030");

		_socket.on("privmsg", ({from, value}) => {
			console.log("Message received:", value);
			const messages = [...session.get("messages"), value];
			session.set("messages", messages);
		})

		_socket.emit("join", {id});

		socket.current = _socket;
	}, [session])

	const sendMessage = async (e: any) => {
		e.preventDefault()
		const messages = [...session.get("messages"), value];
		session.set("messages", messages);
		socket.current.emit("privmsg", {to, from: id, value});
	}

	return <div className={styles.container}>
		<Navbar>
			<Navlink href="/">Home</Navlink>
			<Navlink href="/">About</Navlink>
		</Navbar>
		<main className={styles.main}>
			<h1 className={styles.title}>{id}</h1>

			<input type="text" value={to} onChange={(e: any) => {
				setTo(e.currentTarget.value || e.target.value)
			}}/>
			<input type="text" value={value} onChange={(e: any) => {
				setValue(e.currentTarget.value || e.target.value)
			}}/>
			<button onClick={sendMessage}>Send</button>
			{
				session.has("messages")
				? session.get("messages").map((message: any, index: number) => <p key={index}>{message}</p>)
				: null
			}
		</main>
	</div>;
}

export default Rtc;

//const pc = useRef<RTCPeerConnection>()

//const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
//const _pc = new RTCPeerConnection(configuration);

//_pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
//	if (e.candidate)
//		console.log(e.candidate);
//}

//_pc.oniceconnectionstatechange = (e: any) => {
//	console.log(e)
//}

//_pc.ontrack = (e: any) => {
//	console.log(e)
//}
//pc.current = _pc;


//pc.current?.createOffer()
//	.then((offer: RTCSessionDescriptionInit) => {
//		console.log(offer)
//		pc.current?.setLocalDescription(offer)
//	}).catch((e: any) => {

//	})
