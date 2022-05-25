const getTokenInformations = async (access_token: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/oauth/token/info", {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	})
	return await request.json();
}

const checkToken = async (req, res, next) => {
	let access_token = req.headers.authorization;
	const req_res = await getTokenInformations(access_token);
	const obj = JSON.parse(req_res);

	if (obj.error =="invalid_request")
		res.send('no auth')
	else next()
}

export default checkToken;
