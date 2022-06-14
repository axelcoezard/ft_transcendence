import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSession from "../hooks/useSession";

const Avatar = (props: any) => {
	const [online, setOnline] = useState(false);
	const session = useSession("session");
	const {user, width, height, disabled} = props;

	const fetchStatus = async () => {
		const res = await fetch(`http://localhost:3030/users/${user}/if/${session.get("id")}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		if (data.error) return;
		setOnline(data.isFriend && data.value.status === "online");
	}

	useEffect(() => {
		setOnline(false)
		if (user) fetchStatus();
		return () => setOnline(false);
	}, [user])

	const url = `http://localhost:3030/users/${user}/avatar`;
	const avatar = <div
		style={{
		backgroundImage: `url(${url})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		borderRadius: "50%",
		border: `3px solid ${online ? "#2ecc71" : "#fff"}`,
		width: width,
		height: height,
	}}/>

	if (disabled)	return avatar;
	else return		<Link to={`/profil/${user}`}>{avatar}</Link>
}

export default Avatar;
