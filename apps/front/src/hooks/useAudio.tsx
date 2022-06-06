import useSound from "use-sound";
import { useAppContext } from "../contexts/AppContext";
import useSession from "./useSession";

const useAudio = (path: string, options?: {}) => {
	const session = useSession("session");
	const [playSound] = useSound(path, options);

	const play = () => {
		if (session.get("audio")) playSound();
	}

	return { play };
}

export default useAudio;
