import React, { useState } from "react";
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas, { PONG_HEIGHT, PONG_WIDTH } from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Play.module.scss'
import useSession from "../hooks/useSession";
import Avatar from "../components/Avatar";
import Results from "../components/Results";

const usePlayerDuo = () => {
	const defaults: any = {id: 0, username: "", score: 0}
	const [player1, setPlayer1] = useState<any>(defaults)
	const [player2, setPlayer2] = useState<any>(defaults)
	return [player1, player2, setPlayer1, setPlayer2]
}

const Play = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const [status, setStatus] = useState<string>("waiting")
	const [position, setPosition] = useState<string>("spectator")
	const [player1, player2, setPlayer1, setPlayer2] = usePlayerDuo()
	const [winner, loser, setWinner, setLoser] = usePlayerDuo()

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
				setStatus("started")
				setPlayer1(data.player1)
				setPlayer2(data.player2)
			})
			socket.on("game.stop", (data: any) => {
				setStatus("ended")
				setWinner(data.winner)
				setLoser(data.loser)
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

	const render = (context: CanvasRenderingContext2D, scale: any) => {
		let scaleX = scale.x / PONG_WIDTH;
		let scaleY = scale.y / PONG_HEIGHT;
		context.fillStyle = "#ffffff";
		context.fillRect(left.x * scaleX, left.y * scaleY, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#ffffff";
		context.fillRect(right.x * scaleX, right.y *scaleY, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#BB86FC";
		context.beginPath()
		context.arc(ball.x * scale.x, ball.y * scale.y, ball.diameter / 2, 0, 2 * Math.PI);
		context.fill();
	}

	const canvasRef = useCanvas(() => {}, render);

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
			x: player.x / PONG_WIDTH,
			y: y / PONG_HEIGHT
		})
	}

	return <main className={styles.play}>
		<div className={styles.play_header}>
			<h1>TRANSCENDENCE</h1>
			<p>Pong to the extreme!</p>
		</div>
		<div className={styles.play_scoreboard}>
			<div className={styles.play_scoreboard_left}>
				<Avatar user={player1.id} width="60px" height="60px"/>
				<p>{player1.username}</p>
			</div>
			<div className={styles.play_scoreboard_score}>
				<p>{player1.score}</p><h2>VS</h2><p>{player2.score}</p>
			</div>
			<div className={styles.play_scoreboard_right}>
				<Avatar user={player2.id} width="60px" height="60px"/>
				<p>{player2.username}</p>
			</div>
		</div>
		<div className={styles.play_pong}>
			<canvas
				className={styles.play_canvas}
				ref={canvasRef}
				onMouseMove={handleMove}
			/>
			{status == "ended" ? <Results
				victory={winner.id === session.get("id")}
				url="/home"
			/> : null}
		</div>
	</main>;
};

export default Play;
