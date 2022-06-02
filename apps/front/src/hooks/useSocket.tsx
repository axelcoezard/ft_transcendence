import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "../contexts/AppContext";
import useSession from "./useSession";

const useSocket = (url: string): any => {
	const socket: any = useRef<Socket>()
	const [ready, setReady] = useState<boolean>(false);
	const session = useSession("session");

	useEffect(() => {
		let _socket = io(url, { forceNew: true })
		_socket.on("connect", () => {
			console.log("Socket connected")
			setReady(true)
			_socket.emit("connect_message", session.value);
		})

		socket.current = _socket
		return () => {
			_socket.disconnect()
			setReady(false)
			console.log("Socket disconnected")
		}
	}, [url])

	const on = (name: string, callback: any) => {
		if (socket.current)
			return socket.current.on(name, callback)
	}

	const emit = (name: string, room_type: string, room_id: string, data: any = {}) => {
		if (socket.current)
			return socket.current.emit("message", {
				room: room_type,
				room_id,
				type: name,
				value: data
			})
	}


	return {
		on, emit,
		ready,
		current: socket.current,
		id: socket.current ? socket.current.id : null
	}
}

export default useSocket;
