import useSession from "../hooks/useSession";
import styles from "../styles/Avatar.module.scss";

const Avatar = (props: any) => {
	const session = useSession("session");
	const avatar = session.get("avatar");

	return <div style={{
		backgroundImage: `url(${avatar})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		borderRadius: "50%",
		border: "2px solid #fff",
		width: props.width,
		height: props.height,
	}} />
}

export default Avatar;
