import { createContext, FC, useContext } from "react";
import useSession, { SessionType } from "../hooks/useSession";

const AppContext = createContext<any>({
	session: {
		value: {},
		set: (key: string, value: any) => { },
		has: (key: string) => false,
		get: (key: string) => "",
	}
});

const useAppContext = () => useContext(AppContext);

const AppProvider = (props: any) => {
	const session = useSession("session", {
		audio: false
	});

	const defaultValue = {
		session
	}

	console.log(defaultValue)

	return <AppContext.Provider value={defaultValue}>
		{props.children}
	</AppContext.Provider>
}


export { AppProvider, useAppContext };
export default AppContext;
