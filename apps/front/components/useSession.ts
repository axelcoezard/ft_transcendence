import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useSession = (name: string, keys: Array<string>) => {
	const [storage, setStorage] = useLocalStorage(name, {});

	const setSessionEntry = (key: string, value: any) => {
		setStorage({ ...storage, [key]: value });
	}

	const hasSessionEntry = (key: string) => {
		return keys.indexOf(key) > -1;
	}

	const getSessionEntry = (key: string): string => {
		if (storage)
			return storage[key as keyof typeof storage];
		return "";
	}

	useEffect(() => {
		keys.forEach(key => {
			if (!hasSessionEntry(key)) setSessionEntry(key, null)
		});
	}, []);

	return {session: storage, setSessionEntry, hasSessionEntry, getSessionEntry};
}

export default useSession;
