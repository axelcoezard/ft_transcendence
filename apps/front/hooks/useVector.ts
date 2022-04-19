import { useState } from "react";

const useVector = (x: number, y: number) => {
	const [X, setX] = useState<number>(x);
	const [Y, setY] = useState<number>(y);

	const moveX = (acceleration: number) => setX(X + acceleration);
	const moveY = (acceleration: number) => setY(Y + acceleration);

	return {x: X, y: Y, setX, setY, moveX, moveY};
}

export default useVector;
