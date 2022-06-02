import useSession from "../hooks/useSession";

const QrCode = (props: any) => {
	const {size} = props;
	const session = useSession("session");
	const qrCode = `http://c2r2p3.42nice.fr:3030/auth/twofactor/${session.get("2FA_secret")}`;

	return <div style={{
		width: size,
		height: size,
		backgroundImage: `url(${qrCode})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	}} />
}

export default QrCode;
