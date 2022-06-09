import useLocalStorage from "./useLocalStorage";

export declare type SessionType = {
	value: any,
	set: (key: string, value: any) => void,
	setAll: (entries: any) => void,
	has: (key: string) => boolean,
	get: (key: string) => string | null,
	clear: () => void
}

const useSession = (name: string, defaults={}): SessionType => {
	const [storage, setStorage] = useLocalStorage<typeof defaults>(name, defaults);

	const setEntry = (key: string, value: any) => {
		setStorage({ ...storage, [key]: value });
	}

	const setAllEntries = (entries: any) => {
		let local: any = { ...storage };
		Object.keys(entries).forEach(key => local[key] = entries[key])
		setStorage(local);
	}

	const hasEntry = (key: string) => {
		return Object.keys(storage).indexOf(key) > -1;
	}

	const getEntry = (key: string): string | null => {
		return storage[key as keyof typeof storage] || null;
	}

	const clear = () => {
		setStorage({});
	}

	return {
		value: storage,
		set: setEntry,
		setAll: setAllEntries,
		has: hasEntry,
		get: getEntry,
		clear: clear
	};
}

export default useSession;
