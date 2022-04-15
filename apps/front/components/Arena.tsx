import React, { useRef } from "react";

const Arena = (props: any) => {
	const canvasRef= useRef(null);
	const ctx = canvasRef.current.getContext("2d");


	return <canvas ref={canvasRef} {...props} />;
};

export default Arena;
