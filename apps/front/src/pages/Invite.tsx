import React, { useEffect, useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/Loading"
import { useAppContext } from "../contexts/AppContext";
import useSession from "../hooks/useSession";
import SendIcon from '../components/SVGs/SendIcon';
import { useParams } from 'react-router-dom';

const Invite = () => {
	const {socket} = useAppContext();
	const session = useSession("session");

	useEffect(() => {
		if (socket.current)
		{
			socket.emit("join", "lobby", "", {
				id: session.get("id"),
				username: session.get("username")
			})

			socket.on("match_found", (data: any) => {

			})

			socket.on("match_not_found", (data: any) => {

			})
		}
	}, [socket.current])


	const {context, socketbis} = useAppContext();
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

	return	<div className={styles.matching}>

	</div>
}

export default Invite;
