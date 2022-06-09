import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "../contexts/AppContext";
import useSession from "./useSession";

const useSocket = (url: string): any => {
	const [socket, setSocket] = useState<Socket>()
	const [ready, setReady] = useState<boolean>(false);
	const session = useSession("session");

	useEffect(() => {
		if (!session.get("access_token")) return;
		let _socket = io(url, { forceNew: true })
		_socket.on("connect", () => {
			console.log("Socket connected")
			setReady(true)
			_socket.emit("connect_message", session.value);
		})
		setSocket(_socket)
		return () => {
			_socket.disconnect()
			setReady(false)
			console.log("Socket disconnected")
		}
	}, [url])

	const on = (name: string, callback: any) => {
		if (socket)
			return socket.on(name, callback)
	}

	const emit = (name: string, room_type: string, room_id: string, data: any = {}) => {
		if (socket)
			return socket.emit("message", {
				room: room_type,
				room_id,
				type: name,
				sender: {
					id: session.get("id"),
					username: session.get("username")
				},
				value: data
			})
	}

	return {
		current: socket,
		on, emit,
		ready
	}
}

export default useSocket;
