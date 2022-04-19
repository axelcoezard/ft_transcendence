import useLocalStorage from "./useLocalStorage";

export declare type SessionType = {
	value: any,
	set: (key: string, value: any) => void,
	has: (key: string) => boolean,
	get: (key: string) => string
}

const useSession = (name: string, defaults={}): SessionType => {
	const [storage, setStorage] = useLocalStorage<typeof defaults>(name, defaults);

	const setEntry = (key: string, value: any) => {
		setStorage({ ...storage, [key]: value });
	}

	const hasEntry = (key: string) => {
		return Object.keys(storage).indexOf(key) > -1;
	}

	const getEntry = (key: string): string => {
		return storage[key as keyof typeof storage] || "";
	}

	return {value: storage, set: setEntry, has: hasEntry, get: getEntry};
}

export default useSession;
