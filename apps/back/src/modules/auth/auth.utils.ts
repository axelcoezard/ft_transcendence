import fetch from 'node-fetch';

const getUserAccessToken = async (uid: string, secret: string, code: string, redirect_uri: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/oauth/token", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			grant_type: "authorization_code",
			client_id: uid,
			client_secret: secret,
			code: code,
			redirect_uri
		})
	})
	return await request.json();
}

const getUserInformations = async (access_token: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/v2/me", {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	})
	return await request.json();
}

const getBase64FromURI = async (uri: string): Promise<string> => {
	console.log(`Encoding ${uri} to base64...`);
	const data = await fetch(uri);
	const buffer = await data.buffer();
	return buffer.toString('base64');
}

export {
	getUserAccessToken,
	getUserInformations,
	getBase64FromURI
};