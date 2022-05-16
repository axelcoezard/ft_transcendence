import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string): any => {
	const socket: any = useRef<Socket>()
	const [events, setEvents] = useState<any[]>([])

	useEffect(() => {
		let _socket = io(url, { forceNew: true })
		events.forEach(event => {
			_socket.on(event.name, event.callback)
		})
		console.log("Socket connected")
		socket.current = _socket
		return () => {
			_socket.disconnect()
			console.log("Socket disconnected")
		}
	}, [events, url])

	const on = (name: string, callback: any) => {
		if (events.findIndex(event => event.name === name) !== -1)
			return;

		if (socket.current)
			return socket.current.on(name, callback)

		events.push({ name, callback })
		setEvents(events)
	}

	const emit = (event: string, data: any) => {
		if (socket.current)
			socket.current.emit(event, data)
	}

	return {
		on, emit,
		current: socket.current,
		id: socket.current ? socket.current.id : null
	}
}

export default useSocket;
