import { useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";

const useColyseus = (endpoint: string) => {
	const [client, setClient] = useState<Colyseus.Client>()
	const queue: any[] = []

	useEffect(() => {
		const _client = new Colyseus.Client(endpoint);

		queue.forEach(action => {
			if (action.type === "join")
				_client.join(action.params[0], action.params[1])
		})

		setClient(_client);
	}, [])

	const join = (name: string, options: any) => {
		if (queue.findIndex(action => (
			action.type === "join"
			&& action.params.length > 0
			&& action.params[0] === name
		)) !== -1)
			return;

		if (client)
			return client.join(name, options)

		queue.push({
			type: "join",
			params: [name, options]
		})
	}

	return {join}
}

export default useColyseus;