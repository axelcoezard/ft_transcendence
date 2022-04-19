import { useState, useEffect } from "react";

const getWindowDimensions = () => {
	return {width: window.innerWidth, height: window.innerHeight};
}

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		}
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowDimensions;
}

export default useWindowDimensions;
