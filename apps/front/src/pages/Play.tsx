import Navbar from '../components/Navigation';
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Login.module.scss'
import useColyseus from '../hooks/useColyseus';

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Play = () => {
	const {session, socket, colyseus} = useAppContext();
	const [started, setStarted] = useState(false)

	const computer = usePaddle(20, 50)
	const player = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

	//try {
	//	colyseus.join("default_room", {})
	//	console.log("joined successfully");
	//  } catch (e) {
	//	console.error("join error", e);
	//  }

	socket.on("paddleMove", ({sender, y}: any) => {
		if (sender === session.get("username"))
			return;
		computer.setY(y)
	})

	const reset = () => {
		setStarted(false);
		ball.reset();
		//playWinSound();
		let timeout = setTimeout(() => {
			setStarted(true);
			//playServiceSound();
			clearTimeout(timeout);
		}, 1000);
	}

	const update = (framecount: number) => {
		if (!started) return;

		if ((ball.dx === -1 && ball.x <= 0) ||(ball.dx === 1 && ball.x >= PONG_WIDTH - ball.diameter)) ball.setDx(-ball.dx);
		if ((ball.dy === -1 && ball.y <= 0) || (ball.dy === 1 && ball.y >= PONG_HEIGHT - ball.diameter)) ball.setDy(-ball.dy);

		if (ball.dx === -1 && ball.x <= computer.x + PADDLE_WIDTH
			&& ball.y + ball.diameter > computer.y
			&& ball.y <= computer.y + PADDLE_HEIGHT)
			ball.setDx(-ball.dx);

		if (ball.dx === 1 && ball.x + ball.diameter >= player.x
			&& ball.y + ball.diameter >= player.y
			&& ball.y <= player.y + PADDLE_HEIGHT)
			ball.setDx(-ball.dx);

		if (ball.x <= 0 || ball.x >= PONG_WIDTH - ball.diameter)
			return reset();

		ball.setX(ball.x + ball.dx * ball.speed)
		ball.setY(ball.y + ball.dy * ball.speed)
	}

	const render = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "#60B5E7";
		context.fillRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#60B5E7";
		context.fillRect(computer.x, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#48DAC3";
		context.beginPath()
		context.arc(ball.x, ball.y, ball.diameter / 2, 0, 2 * Math.PI);
		context.fill();
	}

	const canvasRef = useCanvas(update, render);

	const handleKeyboard = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
		switch (e.key) {
			case "w": player.move(-1); break;
			case "ArrowUp": player.move(-1); break;
			case "s": player.move(1); break;
			case "ArrowDown": player.move(1); break;
			default: break;
		}
	}

	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = e.currentTarget || e.target;
		const y = e.clientY - canvas.getBoundingClientRect().y - 50;
		player.setY(y)
		socket.emit("paddleMove", { sender: session.get("username"), y })
	}

	return <main className={styles.main}>
		<canvas
			ref={canvasRef}
			width={PONG_WIDTH}
			height={PONG_HEIGHT}
			onMouseMove={handleMove}
			onKeyDown={handleKeyboard}
		/>
	</main>;
};

export default Play;
