import React, { useState } from "react";
import { useEffect } from 'react'
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Play.module.scss'
import Avatars from "../components/Avatars";
import { useParams } from 'react-router-dom';
import useSession from "../hooks/useSession";
import Avatar from "../components/Avatar";

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Play = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const [started, setStarted] = useState<boolean>(false)
	const [position, setPosition] = useState<string>("spectator")
	const [player1, setPlayer1] = useState<any>({id: 0, name: "", score: 0})
	const [player2, setPlayer2] = useState<any>({id: 0, name: "", score: 0})

	const {id} = useParams()

	const left = usePaddle(20, 50)
	const right = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

	useEffect(() => {
		let data = {
			id: session.get("id"),
			username: session.get("username"),
			elo: session.get("ELO_score")
		};
		if (socket.ready)
		{
			socket.emit("join", "game", id, data)
			socket.on("game.start", (data: any) => {
				setStarted(true)
				setPlayer1(data.player1)
				setPlayer2(data.player2)
			})
			socket.on("game.join", ({position: p}: {position: string}) => {
				setPosition(p)
			})
			socket.on("game.updateBall", (data: any) => {
				ball.setY(data.y)
				ball.setX(data.x)
			})
			socket.on("game.updateScore", (data: any) => {
				setPlayer1(data.player1)
				setPlayer2(data.player2)
			})
			socket.on("game.updatePaddle", (data: any) => {
				if (data.id === session.get("id"))	return;
				if (data.position === position)		return;
				if (data.position === "left")		left.setY(data.y)
				if (data.position === "right")		right.setY(data.y)
			})
		}
		return () => {
			if (socket.ready)
				socket.emit("leave", "game", id, data)
		}
	}, [socket.ready, id])



	const render = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "#ffffff";
		context.fillRect(left.x, left.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#ffffff";
		context.fillRect(right.x, right.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#BB86FC";
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
			id: session.get("id"),
			username: session.get("username"),
			position,
			x: player.x,
			y: player.y
		})
	}

	return <main className={styles.play}>
		<section className={styles.play_pong}>
			<div className={styles.pong_header}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>
			<div className={styles.pong_dashboard}>
				<div className={styles.pong_dashboard_user}>
					<Avatar user={player1.id} width="3.125vw" height="3.125vw"/>
					<p className={styles.text}>{player1.name}</p>
				</div>
				<div className={styles.pong_dashboard_score}>
					<p className={styles.h1}>{player1.score}</p>
					<h2 className={styles.h2}>VS</h2>
					<p className={styles.h1}>{player2.score}</p>
				</div>
				<div className={styles.pong_dashboard_opponant}>
					<Avatar user={player2.id} width="3.125vw" height="3.125vw"/>
					<p className={styles.text}>{player2.name}</p>
				</div>
			</div>
			<div className={styles.pong}>
				<canvas
					ref={canvasRef}
					width={PONG_WIDTH}
					height={PONG_HEIGHT}
					onMouseMove={handleMove}
				/>
			</div>
		</section>
	</main>;
};

export default Play;
