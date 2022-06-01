import useSession from "../hooks/useSession";
import styles from "../styles/Avatar.module.scss";

const Avatar = (props: any) => {
	const {user, width, height} = props;
	const avatar = `http://localhost:3030/users/${user}/avatar`;

	return <div style={{
		backgroundImage: `url(${avatar})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		borderRadius: "50%",
		border: "2px solid #fff",
		width: width,
		height: height,
	}} />
}

export default Avatar;
