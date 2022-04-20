import { useState, useEffect } from "react";
import { Buffer } from "buffer";

const useLocalStorage = <__TYPE> (key: string, defaultValue: __TYPE) => {
	const hook = useState<__TYPE>(() => {
		let base64: string = localStorage.getItem(key) || "";
		let json: any = {};
		try {
			base64 = Buffer.from(base64, "base64").toString("utf8");
			json = JSON.parse(base64);
		}
		catch (e) { json = base64; }
		return json || defaultValue;
	});


	useEffect(() => {
		if (hook[0] === defaultValue)
			return;
		let json = JSON.stringify(hook[0]);
		let base64 = Buffer.from(json, "utf8").toString("base64");
		localStorage.setItem(key, base64);
	}, [hook[0]]);

	return hook;
};

export default useLocalStorage;
