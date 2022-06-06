import { Link } from "react-router-dom";
import useSession from "../hooks/useSession";
import styles from "../styles/Avatar.module.scss";

const Avatar = (props: any) => {
	const {user, width, height, disabled} = props;
	const url = `http://c2r2p3.42nice.fr:3030/users/${user}/avatar`;
	const avatar = <div style={{
		backgroundImage: `url(${url})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		borderRadius: "50%",
		border: "2px solid #fff",
		width: width,
		height: height,
	}} />

	if (disabled)	return avatar;
	else return		<Link to={`/profil/${user}`}>{avatar}</Link>
}

export default Avatar;
