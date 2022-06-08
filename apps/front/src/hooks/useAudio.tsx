import useSound from "use-sound";

const useAudio = (path: string, options?: {}) => {
	const [playSound] = useSound(path, options);

	const play = () => {
		playSound();
	}

	return { play };
}

export default useAudio;
