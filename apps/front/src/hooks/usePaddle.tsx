import { useState } from "react";
import { PONG_HEIGHT } from "./useCanvas";
import useVector from "./useVector";

export const PADDLE_HEIGHT = 100;
export const PADDLE_WIDTH = 20;

const usePaddle = (x: number, y: number) => {
	const location = useVector(x, y);

	const move = (dy: number) => {
		if (location.y > 0 && location.y + PADDLE_HEIGHT < PONG_HEIGHT)
			location.moveY(dy);
	}

	return { ...location, move, width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
}

export default usePaddle;
