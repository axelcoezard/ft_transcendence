import useLocalStorage from "./useLocalStorage";

const useSession = (name: string, defaults={}): any => {
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
