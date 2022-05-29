import { useEffect, useRef } from "react";
import { PONG_HEIGHT, PONG_WIDTH } from "../pages/Play";

export declare type CanvasDrawFunction = (context: CanvasRenderingContext2D, frameCount: number) => void;
export declare type CanvasProcessFunction = (frameCount: number) => void;


const useCanvas = (update: CanvasProcessFunction, draw: CanvasDrawFunction) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const context = canvasRef.current!.getContext('2d')
		let frameCount: number = 0
		let animationFrameId: number;
		

		(function render() {
			frameCount++
			if (context)
			{
				update(frameCount);
				context.fillStyle = "transparent";
				context.fillRect(0, 0, PONG_WIDTH, PONG_HEIGHT);
				draw(context, frameCount);
			}
			animationFrameId = window.requestAnimationFrame(render)
		})();

		return () =>  window.cancelAnimationFrame(animationFrameId)
	}, [update, draw])

	return canvasRef
}

export default useCanvas;
