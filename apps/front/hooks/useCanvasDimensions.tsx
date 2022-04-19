import { useState, useEffect } from "react";

const getCanvasDimensions = (canvas: HTMLCanvasElement) => {
	return {width: canvas.width, height: canvas.height};
}

const useCanvasDimensions = (canvas: HTMLCanvasElement) => {
	const [
		canvasDimensions,
		setCanvasDimensions
	] = useState(getCanvasDimensions(canvas));

	useEffect(() => {
		const handleResize = () => {
			setCanvasDimensions(getCanvasDimensions(canvas));
		}
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return canvasDimensions;
}

export default useCanvasDimensions;
