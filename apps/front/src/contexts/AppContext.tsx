import { createContext, FC, Suspense, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import useSession, { SessionType } from "../hooks/useSession";
import useSocket from "../hooks/useSocket";

const AppContext = createContext<any>({
	session: {
		value: {},
		set: (key: string, value: any) => { },
		has: (key: string) => false,
		get: (key: string) => "",
	},
	socket: {
		on: (name: string, callback: any) => { },
		emit: (name: string, value: any) => { },
		ref: Socket
	}
});

const useAppContext = () => useContext(AppContext);

const AppProvider = (props: any) => {
	const session = useSession("session", {});
	const socket = useSocket("http://localhost:3030")

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
