import React, { useEffect, useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/Loading"
import { useAppContext } from "../contexts/AppContext";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const Matching = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		let data = {
			id: session.get("id"),
			username: session.get("username"),
			elo: session.get("ELO_score")
		};
		if (socket.current)
		{
			socket.emit("join", "lobby", "lobby", data)
			socket.on("lobby.match", (data: any) => {
				navigate(`/play/${data.slug}`)
			})
		}
		return () => {socket.emit("leave", "lobby", "lobby", data)}
	}, [socket.current])
	return	<div className={styles.matching}>
		<Loading title="Matchmaking" subtitle="Veuillez patienter pendant que nous recherchons un adversaire"/>
	</div>
}

export default Matching;
