import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string): any => {
	const socket: any = useRef<Socket>()
	const [events, setEvents] = useState<any[]>([])
	const [emits, setEmits] = useState<any[]>([])

	useEffect(() => {
		let _socket = io(url, { forceNew: true })
		_socket.on("connect", () => {
			console.log("Socket connected")
			events.forEach(event => _socket.on(event.name, event.callback))
			emits.forEach(emit => _socket.emit(emit.name, emit.value))
		})

		socket.current = _socket
		return () => {
			_socket.disconnect()
			console.log("Socket disconnected")
		}
	}, [events, emits, url])

	const on = (name: string, callback: any) => {
		if (events.findIndex(event => event.name === name) !== -1)
			return;

		if (socket.current)
			return socket.current.on(name, callback)

		events.push({ name, callback })
		setEvents(events)
	}

	const emit = (name: string, room_type: string, room_id: string, data: any = {}) => {
		if (emits.findIndex(emit => emit.name === name) !== -1)
			return;

		let value = {
			room: room_type,
			room_id,
			type: name,
			value: data
		}

		if (socket.current)
			return socket.current.emit("message", value)

		emits.push({ name, value })
		setEmits(emits)
	}

	return {
		on, emit,
		current: socket.current,
		id: socket.current ? socket.current.id : null
	}
}

export default useSocket;
