import React, { useState } from "react";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import useSound from 'use-sound';
import useSession from "../hooks/useSession";
import { useAppContext } from "../contexts/AppContext";

export const PONG_HEIGHT: number = 600;
export const PONG_WIDTH: number = 600;

const Pong = () => {
	const {session} = useAppContext();
	const [started, setStarted] = useState(true)

	const computer = usePaddle(20, 50)
	const player = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

	const ballCollision: any = [
		useSound("/sounds/Sample_0005.wav", {volume: 1}),
		useSound("/sounds/Sample_0007.wav", {volume: 1}),
		useSound("/sounds/Sample_0010.wav", {volume: 1}),
		useSound("/sounds/Sample_0012.wav", {volume: 1}),
		useSound("/sounds/Sample_0017.wav", {volume: 1}),
	]

	const [playServiceSound] = useSound("/sounds/service.wav", {volume: 1})
	const [playWinSound] = useSound("/sounds/tadam.wav", {volume: 0.5})

	const reset = () => {
		setStarted(false);
		ball.reset();
		playWinSound();
		let timeout = setTimeout(() => {
			setStarted(true);
			playServiceSound();
			clearTimeout(timeout);
		}, 1000);
	}

	const update = (framecount: number) => {
		if (!started) return;
		if (ball.dx == -1 && ball.x <= 0 || ball.dx == 1 && ball.x >= PONG_WIDTH - ball.diameter) ball.setDx(-ball.dx);
		if (ball.dy == -1 && ball.y <= 0 || ball.dy == 1 && ball.y >= PONG_HEIGHT - ball.diameter) ball.setDy(-ball.dy);

		if (ball.dx == -1 && ball.x <= computer.x + PADDLE_WIDTH
			&& ball.y + ball.diameter > computer.y
			&& ball.y <= computer.y + PADDLE_HEIGHT)
		{
			ball.setDx(-ball.dx);
			ballCollision[Math.floor(Math.random() * ballCollision.length)][0]();
		}

		if (ball.dx == 1 && ball.x + ball.diameter >= player.x
			&& ball.y + ball.diameter >= player.y
			&& ball.y <= player.y + PADDLE_HEIGHT)
		{
			ball.setDx(-ball.dx);
			ballCollision[Math.floor(Math.random() * ballCollision.length)][0]();
		}

		if (ball.x <= 0 || ball.x >= PONG_WIDTH - ball.diameter)
			return reset();

		ball.setX(ball.x + ball.dx * ball.speed)
		ball.setY(ball.y + ball.dy * ball.speed)

		computer.setY(ball.y - PADDLE_HEIGHT / 2);
	}

	const render = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "white";
		context.fillRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "white";
		context.fillRect(computer.x, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "white";
		context.beginPath()
		context.arc(ball.x, ball.y, ball.diameter / 2, 0, 2 * Math.PI);
		context.fill();
		context.fillText(`${session.get("name")}`, PONG_WIDTH / 2 - (session.get("name").length * 2), PONG_HEIGHT / 2);
	}

	const canvasRef = useCanvas(update, render);

	const handleKeyboard = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
		const canvas: HTMLCanvasElement = e.currentTarget || e.target;
		console.log(e.key)
		switch (e.key) {
			case "w": player.move(-1); break;
			case "ArrowUp": player.move(-1); break;
			case "s": player.move(1); break;
			case "ArrowDown": player.move(1); break;
			case "Escape":
				canvas.style.cursor = 'auto';
				canvas.blur();
				break;
			default: break;
		}
	}

	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = e.currentTarget || e.target;
		player.setY(e.clientY - canvas.getBoundingClientRect().y - 50)
	}

	return <canvas
		ref={canvasRef}
		width={PONG_WIDTH}
		height={PONG_HEIGHT}
		onMouseMove={handleMove}
		onKeyDown={handleKeyboard}
	/>;
};

export default Pong;
