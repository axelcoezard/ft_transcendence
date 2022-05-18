import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import useColyseus from "../hooks/useColyseus";
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
	},
	colyseus: null
});

const useAppContext = () => useContext(AppContext);

const AppProvider = (props: any) => {
	const session = useSession("session", {});
	const socket = useSocket("c2r10p3.42nice.fr:3030")
	const colyseus = useColyseus("ws://localhost:3030")

	const defaultValue = {
		session,
		socket,
		colyseus
	}

	return <AppContext.Provider value={defaultValue}>
		{props.children}
	</AppContext.Provider>
}


export { AppProvider, useAppContext };
export default AppContext;
