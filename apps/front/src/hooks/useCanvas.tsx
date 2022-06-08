import { RefObject, useEffect, useRef, useState } from "react";

export declare type CanvasDrawFunction = (
	context: CanvasRenderingContext2D,
	scale: { x: number, y: number }
) => void;

export declare type CanvasProcessFunction = (
	scale: { x: number, y: number }
) => void;

export const PONG_WIDTH: number = 600;
export const PONG_HEIGHT: number = 400;

const useCanvas = (update: CanvasProcessFunction, draw: CanvasDrawFunction)
	: [RefObject<HTMLCanvasElement>,{ x: number, y: number } ] => {
	const [scale, setScale] = useState({ x: PONG_WIDTH, y: PONG_HEIGHT });
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const resized = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		setScale({ x: canvas.clientWidth, y: canvas.clientHeight });
	};

	useEffect(() => {
		const context = canvasRef.current!.getContext('2d')
		let animationFrameId: number;

		(function render() {
			if (context)
			{
				var radius = 300;
				var angle = Math.atan2(300, 300) + Math.PI / 2;
				var gx = radius * Math.cos(angle);
				var gy = radius * Math.sin(angle);
				var cx = 150;
				var cy = 250;

				var gradient = context.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
				gradient.addColorStop(0, "#48DAC3");
				gradient.addColorStop(0.4, "#60B5E7");
				gradient.addColorStop(1, "#BB86FC");

				update(scale);
				context.fillStyle = gradient;
				context.fillRect(0, 0, scale.x, scale.y);
				draw(context, scale);
			}
			animationFrameId = window.requestAnimationFrame(render)
		})();

		return () =>  window.cancelAnimationFrame(animationFrameId)
	}, [update, draw])

	useEffect(() => resized(), []);

	useEffect(() => {
		const currentCanvas = canvasRef.current;
		currentCanvas?.addEventListener("resize", resized);
		return () => currentCanvas?.removeEventListener("resize", resized);
	})

	return [canvasRef, scale]
}

export default useCanvas;
