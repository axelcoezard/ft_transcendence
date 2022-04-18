import React, { useDebugValue, useEffect, useLayoutEffect, useState } from "react";
import useCanvas from "../hooks/useCanvas";
import usePlayer from "../hooks/usePlayer";
import useToggle from "../hooks/useToggle";

const Pong = () => {
	const [lock, setLock] = useState(false)
	const player = usePlayer(0, 0)

	const draw = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "black";
		context.fillRect(0, 0, 500, 500)
		context.fillStyle = "white";
		context.fillRect(player.x, player.y, 20, 100)
		context.fillStyle = "white";
		context.fillRect(470, 50, 20, 100)
		context.fillStyle = "white";
		context.beginPath()
		context.arc(250, 100, 10, 0, 2 * Math.PI);
		context.fill();
	}

	const canvasRef = useCanvas(draw);

	useEffect(() => {
		if (canvasRef.current && lock)
			canvasRef.current.focus();
	}, [canvasRef])

	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (lock) return
		const canvas: HTMLCanvasElement = e.currentTarget || e.target;
		canvas.style.cursor = 'none';
		canvas.focus();
		setLock(true);
	};

	const handleKeyboard = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
		if (!lock) return;
		const canvas: HTMLCanvasElement = e.currentTarget || e.target;
		console.log(e.key)
		switch (e.key) {
			case "w": player.move(0, -1); break;
			case "ArrowUp": player.move(0, -1); break;
			case "s": player.move(0, 1); break;
			case "ArrowDown": player.move(0, 1); break;
			case "Escape":
				canvas.style.cursor = 'auto';
				canvas.blur();
				setLock(false);
				break;
			default: break;
		}
	}

	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = e.currentTarget || e.target;
		if (lock) player.setY(e.clientY - canvas.getBoundingClientRect().y - 50)
	}

	return <canvas
		ref={canvasRef}
		width={500}
		height={500}
		onClick={handleClick}
		onMouseMove={handleMove}
		onKeyDown={handleKeyboard}
	/>;
};

export default Pong;
