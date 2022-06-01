import { useEffect, useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import WriteIcon from '../components/SVGs/WriteIcon';
import SendIcon from '../components/SVGs/SendIcon';
import Message from "../components/tchat/Message";
import Conversations from "../components/Conversations";
import BinIcon from '../components/SVGs/BinIcon';
import PlusIcon from '../components/SVGs/PlusIcon';
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';

const Tchat = () => {
	const {session, socket} = useAppContext();
	const [messages, setMessages] = useState<any[]>([]);
	const [channels, setChannels] = useState<any[]>([]);
	const [value, setValue] = useState("");
	let {slug: s} = useParams();
	let slug = s == "@me" ? session.get("username") : s;

	useEffect(() => {
		if (socket.ready)
		{
			if (slug) socket.emit("join", "chat", slug, {
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

	return <main className={styles.tchat}>
		<section className={styles.tchat_indexing}>
			<div className={styles.indexing_header}>
				<div className={styles.indexing_header_new}>
					<PlusIcon width="1.5vw" height="1.5vw" />
					<p className={styles.text}>New chat</p>
				</div>
				<BinIcon width="1.5vw" height="1.5vw" />
			</div>
			<ul className={styles.indexing_list}>
				{ channels.map((channel: any, index: number) => <Conversations
					key={index}
					to={`/tchat/${channel.slug}`}
					channel={channel.slug}
				/>)}
			</ul>
		</section>

		<section className={styles.tchat_conversation}>
			<div className={styles.conversation_header}>
				<h1 className={styles.h1}>{slug}</h1>
			</div>
			<ul className={styles.conversation_messages}>
				{messages.map((message: any, index: number) => <Message
					key={index}
					type={message.type}
					origin={{
						id: message.sender_id,
						username: message.sender_username
					}}
					value={message}
				/>)}
			</ul>
			<form className={styles.conversation_send}>
				<WriteIcon width="1.5vw" height="1.5vw" />
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
			</form>
		</section>
	</main>
}

export default Tchat;
