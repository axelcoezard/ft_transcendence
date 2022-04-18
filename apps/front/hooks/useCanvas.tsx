import { useEffect, useRef } from "react";

export declare type CanvasDrawFunction = (context: CanvasRenderingContext2D, frameCount: number) => void;

const useCanvas = (draw: CanvasDrawFunction) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const context = canvasRef.current!.getContext('2d')
		let frameCount: number = 0
		let animationFrameId: number;

		(function render() {
		  frameCount++
		  if (context) draw(context, frameCount)
		  animationFrameId = window.requestAnimationFrame(render)
		})();

		return () =>  window.cancelAnimationFrame(animationFrameId)
	}, [draw])

	return canvasRef
}

export default useCanvas;
