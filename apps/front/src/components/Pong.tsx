import React, { useState } from "react";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Pong = () => {
	const [started, setStarted] = useState(false)

	const computer = usePaddle(20, 50)
	const player = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

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

	const update = async (framecount: number) => {
		if (ball.dx == -1 && ball.x <= 0 || ball.dx == 1 && ball.x >= PONG_WIDTH - ball.diameter) ball.setDx(-ball.dx);
		if (ball.dy == -1 && ball.y <= 0 || ball.dy == 1 && ball.y >= PONG_HEIGHT - ball.diameter) ball.setDy(-ball.dy);

		if (ball.dx == -1 && ball.x <= computer.x + PADDLE_WIDTH
			&& ball.y + ball.diameter > computer.y
			&& ball.y <= computer.y + PADDLE_HEIGHT)
			ball.setDx(-ball.dx);

		if (ball.dx == 1 && ball.x + ball.diameter >= player.x
			&& ball.y + ball.diameter >= player.y
			&& ball.y <= player.y + PADDLE_HEIGHT)
			ball.setDx(-ball.dx);

		if (ball.x <= 0 || ball.x >= PONG_WIDTH - ball.diameter)
			return reset();

		computer.setY(ball.y - PADDLE_HEIGHT / 2);
		player.setY(ball.y - PADDLE_HEIGHT / 2);

		if (!started) return;
		ball.setX(ball.x + ball.dx * ball.speed)
		ball.setY(ball.y + ball.dy * ball.speed)
	}

	const render = async (context: CanvasRenderingContext2D, _: any) => {
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
