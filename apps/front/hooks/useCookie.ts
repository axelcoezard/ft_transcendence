import { useEffect, useState } from "react";
import cookie from 'react-cookies'

const useCookie = <__TYPE> (key: string, defaultValue: __TYPE) => {
	const hook = useState<__TYPE>(defaultValue);

	useEffect(() => {
		const saved: string = cookie.load(key) || "";
		let value: any = {};
		try { value = JSON.parse(Buffer.from(saved).toString()); }
		catch (e) { value = saved; }
		hook[1](value);
		return () => {}
	}, []);

	useEffect(() => {
		if (hook[0] === defaultValue)
			return;
		cookie.save(key, Buffer.from(JSON.stringify(hook[0])).toString("base64"), { path: '/' });
	}, [hook[0]]);

	return hook;
};

export default useCookie
