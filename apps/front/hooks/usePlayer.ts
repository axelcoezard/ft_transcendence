import { useState } from "react";

export const PLAYER_HEIGHT = 100;
export const PLAYER_WIDTH = 100;

const usePlayer = (X: number, Y: number) => {
	const [x, setX] = useState(X);
	const [y, setY] = useState(Y);

	const move = (dx: number, dy: number) => {
		setX(x + dx);
		setY(y + dy);
	}

	return { x, y, setX, setY, move };
}

export default usePlayer;
