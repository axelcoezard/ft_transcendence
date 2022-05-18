import { Client, Room } from "colyseus";

class AppRoom extends Room {
	onCreate (options: any) {
		this.onMessage("type", (client, message) => {

		});
	}

	onJoin (client: Client, options: any) {

	}

	onLeave (client: Client, consented: boolean) {

	}

	onDispose() {
	}
}

export default AppRoom;
