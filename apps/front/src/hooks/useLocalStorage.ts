import { useState, useEffect } from "react";
import { Buffer } from "buffer";

const useLocalStorage = <__TYPE> (key: string, defaultValue: __TYPE) => {
	const hook = useState<__TYPE>(() => {
		let base64: string = localStorage.getItem(key) || "";
		let json: any = {};
		try {
			json = JSON.parse(base64);
		}
		catch (e) {}
		return json || defaultValue;
	});


	useEffect(() => {
		if (hook[0] === defaultValue)
			return;
		localStorage.setItem(key, JSON.stringify(hook[0]));
	}, [hook[0]]);

	return hook;
};

export default useLocalStorage;
