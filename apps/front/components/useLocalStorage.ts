import { useState, useEffect } from "react";
import { StringDecoder } from "string_decoder";

const useLocalStorage = <__TYPE>(key: string, defaultValue: __TYPE) => {
	const hook = useState<__TYPE>();

	useEffect(() => {
		const saved: any = localStorage.getItem(key) || "";
		let value: __TYPE;
		try { value = JSON.parse(saved) || defaultValue; }
		catch (e) { value = saved || defaultValue; }
		hook[1](value);
	}, []);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(hook[0]));
	}, [hook[0]]);

	return hook;
};

export default useLocalStorage;
