import React, { useState } from "react";
import { useEffect } from 'react'
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Play.module.scss'
// import useColyseus from '../hooks/useColyseus';
import Avatars from "../components/Avatars";
import Pong from "../components/SVGs/Pong"
import WriteIcon from "../components/SVGs/WriteIcon";
import SendIcon from "../components/SVGs/SendIcon";
import CrossIcon from "../components/SVGs/CrossIcon";
import ReportIcon from "../components/SVGs/ReportIcon";
import Messages from "../components/Messages";
import { useParams } from 'react-router-dom';

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Play = () => {
	const {session, socket} = useAppContext();
	const [started, setStarted] = useState<boolean>(false)
	const [position, setPosition] = useState<string>("spectator")
	const [player1, setPlayer1] = useState<any>({
		name: "",
		score: 0
	})
	const [player2, setPlayer2] = useState<any>({
		name: "",
		score: 0
	})

	const {id} = useParams()

	const left = usePaddle(20, 50)
	const right = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

	useEffect(() => {
		if (socket.ready)
			socket.emit("join", "game", id, {
				id: session.get("id"),
				username: session.get("username"),
			})
		return () => {
			socket.emit("leave", "game", id, {
				id: session.get("id"),
				username: session.get("username")
			})
		}
	}, [socket.ready])

	socket.onAfterInit("joinGame", ({position}: {position: string}) => setPosition(position))

	socket.onAfterInit("startGame", (data: any) => {
		setStarted(true)
		setPlayer1(data.player1)
		setPlayer2(data.player2)
	})

	socket.onAfterInit("updateGame", (data: any) => {
		setPlayer1(data.player1)
		setPlayer2(data.player2)
		ball.setY(data.y)
		ball.setX(data.x)
	})

	socket.onAfterInit("paddleMove", (data: any) => {
		console.log(data.sender, session.get("username"))
		if (data.sender === session.get("username"))
			return;
		console.log(data.sender_position)
		if (data.sender_position === position)
			return;
		if (data.sender_position === "left")
			left.setY(data.y)
		if (data.sender_position === "right")
			right.setY(data.y)
	})

	const render = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "#60B5E7";
		context.fillRect(left.x, left.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#60B5E7";
		context.fillRect(right.x, right.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#48DAC3";
		context.beginPath()
		context.arc(ball.x, ball.y, ball.diameter / 2, 0, 2 * Math.PI);
		context.fill();
	}

	const canvasRef = useCanvas((framecount: number) => {}, render);
	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (position === "spectator")
			return;
		const canvas = e.currentTarget || e.target;
		const y = e.clientY - canvas.getBoundingClientRect().y - 50;
		let player = position === "left" ? left : right;
		player.setY(y)
		socket.emit("paddleMove", "game", id, {
			sender: session.get("username"),
			sender_position: position,
			x: player.x,
			y: player.y
		})
	}

	return <main className={styles.play}>

		{/* PLAY PONG */}
		<section className={styles.play_pong}>

			{/* HEDAR : NMAE, CATCHPHRASE */}
			<div className={styles.pong_header}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>

			{/* DAHSBOARD : PLAYERS, VS */}
			<div className={styles.pong_dashboard}>
				<div className={styles.pong_dashboard_user}>
					<Avatars.PurpleAvatar width="4.2vw" height="4.2vw" />
					<p className={styles.text}>{player1.name} {player1.score}</p>
				</div>
				<h2 className={styles.h2}>VS</h2>
				<div className={styles.pong_dashboard_opponant}>
					<p className={styles.text}>{player2.name} {player2.score}</p>
					<Avatars.GreenAvatar width="4.2vw" height="4.2vw" />
				</div>
			</div>

			{/* PONG */}
			<canvas
				ref={canvasRef}
				width={PONG_WIDTH}
				height={PONG_HEIGHT}
				onMouseMove={handleMove}
			/>
		</section>
	</main>;
};

export default Play;
