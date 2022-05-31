import React, { useEffect, useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/Loading"
import { useAppContext } from "../contexts/AppContext";
import useSession from "../hooks/useSession";

const View = () => {
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

	return	<div className={styles.matching}>
		
	</div>
}

export default View;
