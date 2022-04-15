import { useState, useEffect } from "react";

const useLocalStorage = <__TYPE> (key: string, defaultValue: __TYPE) => {
	const hook = useState<__TYPE>(defaultValue);

	useEffect(() => {
		const saved: string = localStorage.getItem(key) || "";
		let value: any = {};
		try { value = JSON.parse(Buffer.from(saved).toString()); }
		catch (e) { value = saved; }
		hook[1](value);
		return () => {}
	}, []);

	useEffect(() => {
		if (hook[0] === defaultValue)
			return;
		localStorage.setItem(key, Buffer.from(JSON.stringify(hook[0])).toString("base64"));
	}, [hook[0]]);

	return hook;
};

export default useLocalStorage;
