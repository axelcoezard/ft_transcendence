import { INestApplication } from '@nestjs/common';
import { Server } from 'socket.io';

export default class Tchat {
	private io: Server;
	private users: any;

	constructor (app: INestApplication)
	{
		this.io = new Server(app.getHttpServer(), {
			cors: {
			origin: "*",
			methods: ["GET", "POST"]
			}
		});

		this.users = new Map();

		this.io.on('connection', (socket) => {
			console.log('a user connected');

			socket.on('join', ({id}) => {
				this.users.set(socket, {socket, id});
			})

			socket.on("privmsg", ({from, to, value}) => {
				this.getUserById(to)?.socket.emit("privmsg", {from, value});
				console.log(`${from} -> ${to}: ${value}`);
			})

			socket.on('disconnect', () => {
				console.log('user disconnected');
				this.users.delete(socket);
			})
		})
	}

	public getUserById = (id) => {
		for (let [key, value] of this.users)
			if (value.id == id)
				return value;
		return null;
	}

	public getUserBySocket = (socket) => {
		return this.users.get(socket);
	}
}




