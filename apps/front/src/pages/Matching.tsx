import React, { useEffect, useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/SVGs/Loading"
import { useAppContext } from "../contexts/AppContext";
import useSession from "../hooks/useSession";

const Matching = () => {
	const {socket} = useAppContext();
	const session = useSession("session");

	useEffect(() => {
		if (socket.current)
		{
			socket.emit("join", "lobby", "lobby", {
				id: session.get("id"),
				username: session.get("username")
			})

			socket.on("match_found", (data: any) => {

			})

			socket.on("match_not_found", (data: any) => {

			})
		}
	}, [socket.current])
	return	<div className={styles.matching}>
		<Loading
			title="Matchmaking"
			subtitle="Veuillez patienter pendant que nous recherchons un adversaire"
		/>
	</div>
}

export default Matching;
