import React, { useState } from "react";
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useAudio from "../hooks/useAudio";
import useCanvas, { PONG_HEIGHT, PONG_WIDTH } from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/pages/Play.module.scss'
import useSession from "../hooks/useSession";
import Avatar from "../components/Avatar";
import PlayCountdown from "../components/play/PlayCountdown";
import PlayResult from "../components/play/PlayResult";

const usePlayerDuo = () => {
	const [player1, setPlayer1] = useState<any>({})
	const [player2, setPlayer2] = useState<any>({})
	return [player1, player2, setPlayer1, setPlayer2]
}

const Play = () => {
	const {socket} = useAppContext();
	const session = useSession("session");
	const [status, setStatus] = useState<string>("waiting")
	const [countdown, setCountdown] = useState(3);
	const [position, setPosition] = useState<string>("spectator")
	const [player1, player2, setPlayer1, setPlayer2] = usePlayerDuo()
	const [winner, loser, setWinner, setLoser] = usePlayerDuo()
	const [scale, setScale] = useState<any>({ x: PONG_WIDTH, y: PONG_HEIGHT })

	const {id} = useParams()

	const left = usePaddle(20, (PONG_HEIGHT - PADDLE_HEIGHT) / 2)
	const right = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, (PONG_HEIGHT - PADDLE_HEIGHT) / 2)
	const ball = useBall();

	/*const service = useAudio("/sounds/service.wav");
	const tadam = useAudio("/sounds/tadam.wav");
	const pong = [
		useAudio("/sounds/Pong_1.wav"),
		useAudio("/sounds/Pong_2.wav"),
		useAudio("/sounds/Pong_3.wav"),
		useAudio("/sounds/Pong_4.wav"),
	]*/

	useEffect(() => {
		let data = {
			id: session.get("id"),
			username: session.get("username"),
			elo: session.get("ELO_score"),
			color: session.get("color_paddle")
		};

		if (socket.ready)
		{
			socket.emit("join", "game", id, data)
			socket.on("game.starting", (data: any) => {
				setPlayer1(data.player1)
				setPlayer2(data.player2)
				setStatus("starting")
			})
			socket.on("game.start", (data: any) => {
				setStatus("started")
			})
			socket.on("game.stop", (data: any) => {
				setStatus("ended")
				setWinner(data.winner)
				setLoser(data.loser)

				if (data.winner.id === session.get("id"))
					session.set("ELO_score", data.winner.elo)
				else session.set("ELO_score", data.loser.elo)

				//tadam.play()
			})
			socket.on("game.countdown", ({countdown}: any) => {
				setCountdown(countdown)
			})
			socket.on("game.join", ({position: p}: {position: string}) => {
				setPosition(p)
			})
			socket.on("game.sound", (data: any) => {
				/*if (data.sound === "service") service.play()
				if (data.sound === "pong")
					pong[Math.floor(Math.random() * pong.length)].play()
				if (data.sound === "tadam") tadam.play()*/
			})
			socket.on("game.updateBall", (data: any) => {
				ball.setY(data.y * scale.y)
				ball.setX(data.x * scale.x)
			})
			socket.on("game.updateScore", (data: any) => {
				setPlayer1(data.player1)
				setPlayer2(data.player2)
			})
			socket.on("game.updatePaddle", (data: any) => {
				if (data.id === session.get("id"))	return;
				if (data.position === position)		return;

				const X = data.x * scale.x;
				const Y = data.y * scale.y;
				if (data.position === "left")	{left.setX(X); left.setY(Y);}
				if (data.position === "right")	{right.setX(X); right.setY(Y);}
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
		let scaleMoy = (scaleX + scaleY) / 2;
		context.fillStyle = player1.color || "white";
		context.fillRect(left.x, left.y, PADDLE_WIDTH * scaleX, PADDLE_HEIGHT * scaleY);
		context.fillStyle = player2.color || "white";
		context.fillRect(right.x, right.y, PADDLE_WIDTH * scaleX, PADDLE_HEIGHT * scaleY)
		context.fillStyle = "#ffffff";
		context.beginPath()
		context.arc(ball.x, ball.y, ball.diameter * scaleMoy / 2, 0, 2 * Math.PI);
		context.fill();
	}

	const update = (scale: any) => {
		let ratio = scale.x / PONG_WIDTH;
		let margin = 20 * ratio;
		left.setX(margin)
		right.setX(scale.x - margin - PADDLE_WIDTH * ratio)
	}

	const [canvasRef] = useCanvas(update, render);

	const handleMove = (e: any
	) => {
		if (position === "spectator")
			return;
		const canvas = e.currentTarget || e.target;
		const y = e.clientY - canvas.getBoundingClientRect().y;
		let player = position === "left" ? left : right;
		player.setY(y)
		socket.emit("paddleMove", "game", id, {
			id: session.get("id"),
			username: session.get("username"),
			position,
			x: player.x / scale.x,
			y: player.y / scale.y
		})
	}

	return <main className={styles.play}>
		<div className={styles.play_header}>
			<h1>TRANSCENDENCE</h1>
			<p>Pong to the extreme!</p>
		</div>
		{status !== "waiting" && <div className={styles.play_scoreboard}>
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
		</div>}
		<div className={styles.play_pong}>
			<canvas
				className={styles.play_canvas}
				ref={canvasRef}
				onMouseMove={handleMove}
				onTouchStart={handleMove}
			/>
			{status == "starting" && <PlayCountdown countdown={countdown}/>}
			{status === "ended" && <PlayResult
				victory={winner.id === session.get("id")}
				url="/home"
			/>}
		</div>
	</main>;
};

export default Play;
