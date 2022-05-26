import Navbar from '../components/Navigation';
import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Login.module.scss'
import { useParams } from 'react-router-dom';

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Play = () => {
	const {session, socket} = useAppContext();
	const [started, setStarted] = useState<boolean>(false)
	const [position, setPosition] = useState<string>("spectator")

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

	socket.onAfterInit("ballMove", (data: any) => {
		ball.setY(data.y)
		ball.setX(data.x)
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

	return <main className={styles.main}>
		<canvas
			ref={canvasRef}
			width={PONG_WIDTH}
			height={PONG_HEIGHT}
			onMouseMove={handleMove}
		/>
	</main>;
};

export default Play;
