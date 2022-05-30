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
				var radius = 300;
				var angle = Math.atan2(300, 300) + Math.PI / 2;
				var gx = radius * Math.cos(angle);
				var gy = radius * Math.sin(angle);
				var cx = (0 + 300) / 2;
				var cy = (200 + 300) / 2;
				
				var my_gradient = context.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
				
				my_gradient.addColorStop(0, "#48DAC3");
				my_gradient.addColorStop(0.4, "#60B5E7");
				my_gradient.addColorStop(1, "#BB86FC");
				update(frameCount);
				context.fillStyle = my_gradient;
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
