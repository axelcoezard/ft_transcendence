import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import useSession from "../hooks/useSession";
import useSocket from "../hooks/useSocket";

const AppContext = createContext<any>({
	session: {
		value: {},
		set: (key: string, value: any) => { },
		setAll: (entries: any) => { },
		has: (key: string) => false,
		get: (key: string) => "",
	},
	socket: {
		on: (name: string, callback: any) => { },
		emit: (name: string, value: any) => { },
		current: null,
		id: null
	}
});

const useAppContext = () => useContext(AppContext);

const AppProvider = (props: any) => {
	const session = useSession("session", {});
	const socket = useSocket("http://c2r2p3.42nice.fr:3030")

	const defaultValue = {
		session,
		socket
	}

	return <AppContext.Provider value={defaultValue}>
		{props.children}
	</AppContext.Provider>
}


export { AppProvider, useAppContext };
export default AppContext;
