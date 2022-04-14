import useLocalStorage from "./useLocalStorage";

const useSession = (name: string, defaults={}) => {
	const [storage, setStorage] = useLocalStorage(name, defaults);

	const setEntry = (key: string, value: any) => {
		setStorage({ ...storage, [key]: value });
	}

	const hasEntry = (key: string) => {
		return Object.keys(storage).indexOf(key) > -1;
	}

	const getEntry = (key: string): string => {
		return storage[key as keyof typeof storage];
	}

	return {set: setEntry,	has: hasEntry, get: getEntry};
}

export default useSession;
