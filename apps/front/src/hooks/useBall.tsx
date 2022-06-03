import { useEffect, useState } from "react";
import { PONG_HEIGHT, PONG_WIDTH } from "./useCanvas";
import useVector from "./useVector";

export const BALL_DIAMETER = 20;

const getIninitalLocation = () => {
	return {
		x: Math.floor((PONG_WIDTH - BALL_DIAMETER) / 2),
		y: Math.floor((PONG_HEIGHT - BALL_DIAMETER) / 2)
	}
}

const getInitialDirection = () => {
	return {
		dx: Math.round(Math.random()) * 2 - 1,
		dy: Math.round(Math.random()) * 2 - 1
	}
}

const useBall = () => {
	const initialLocation = getIninitalLocation();
	const initialDirection = getInitialDirection();

	const location = useVector(initialLocation.x, initialLocation.y);
	const [dx, setDx] = useState<number>(initialDirection.dx);
	const [dy, setDy] = useState<number>(initialDirection.dy);

	const speed: number = 0.1;

	const reset = () => {
		const initialLocation = getIninitalLocation();
		const initialDirection = getInitialDirection();

		location.setX(initialLocation.x)
		location.setY(initialLocation.y);
		setDx(initialDirection.dx);
		setDy(initialDirection.dy);
	}

	return {dx, dy, setDx, setDy, diameter: BALL_DIAMETER, speed, reset, ...location};
}

export default useBall;
