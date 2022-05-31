import { useEffect, useState } from 'react'

import styles from '../styles/Tchat.module.scss'
import WriteIcon from '../components/SVGs/WriteIcon';
import SendIcon from '../components/SVGs/SendIcon';
import CrossIcon from "../components/SVGs/CrossIcon";
import Messages from "../components/Messages";
import Conversations from "../components/Conversations";
import DropdownMenu from "../components/DropdownMenu";
import BinIcon from '../components/SVGs/BinIcon';
import PlusIcon from '../components/SVGs/PlusIcon';
import SearchIcon from '../components/SVGs/SearchIcon';
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';

const Tchat = () => {
	const {session, socket} = useAppContext();
	const [messages, setMessages] = useState<any[]>([]);
	const [channels, setChannels] = useState<any[]>([]);
	const [value, setValue] = useState("");
	const [search, setSearch] = useState("");
	const {slug} = useParams();

	useEffect(() => {
		if (socket.ready)
		{
			if (slug) socket.emit("join", "chat", slug, {
				id: session.get("id"),
				username: session.get("username")
			})
			socket.on("chat.msg", (res: any) => {
				setMessages(res);
				console.log(res)
			})
		}
	}, [socket.ready, slug])

	return <main className={styles.tchat}>
		<section className={styles.tchat_indexing}>
			<div className={styles.indexing_header}>
				<div className={styles.indexing_header_new}>
					<PlusIcon width="1.5vw" height="1.5vw" />
					<p className={styles.text}>New chat</p>
				</div>
				<BinIcon width="1.5vw" height="1.5vw" />
			</div>
			<div className={styles.indexing_search}>
				<SearchIcon width="1.5vw" height="1.5vw" />
				<input
					className={styles.indexing_search_input}
					type="text"
					value={search}
					onChange={(e: any) => {
					setSearch(e.currentTarget.value || e.target.value)
				}}/>
			</div>
			<ul className={styles.indexing_list}>
				{ channels.map((channel: any, index: number) => <Conversations
					key={index}
					channel={channel.slug}
				/>)}
				<p className={styles.text}>No tchat.</p>
			</ul>
		</section>

		<section className={styles.tchat_conversation}>
			<div className={styles.conversation_header}>
				<DropdownMenu />
				<h1 className={styles.h1}>CHANNEL NAME/USER NAME</h1> {/* BACK */}
				<CrossIcon width="1.3vw" height="1.3vw" />
			</div>
			<ul className={styles.conversation_messages}>
				{messages.map((message: any, index: number) => <Messages
					key={index}
					origin={message.sender_username}
					message={message.value}
				/>)}
			</ul>
			<div className={styles.conversation_send}>
				<WriteIcon width="1.5vw" height="1.5vw" />
				<input className={styles.conversation_send_input} type="text" value={value}
				onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
				}}/>
				<button className={styles.conversation_send_button}
					onClick={(e) => {
						socket.emit("msg", "chat", slug, {
							id: session.get("id"),
							username: session.get("username"),
							channel_slug: slug,
							type: "text",
							value: value
						})
						setValue("")
					}}>
					<SendIcon width="1.5vw" height="1.5vw" />
				</button>
			</div>
		</section>
	</main>
}

export default Tchat;
