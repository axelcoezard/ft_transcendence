import useSound from "use-sound";
import { useAppContext } from "../contexts/AppContext";

const useAudio = (path: string, options?: {}) => {
	const {session} = useAppContext();
	const [playSound] = useSound(path, options);

	const play = () => {
		if (session.audio) playSound();
	}

	return { play };
}

export default useAudio;
