import QrCode from "../components/QrCode";
import QrCodeValidator from "../components/QrCodeValidator";

const Settings = () => {
	return <div style={{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "500px",
		height: "400px",
		zIndex: "1000",
	}}>
		<h1>Settings</h1>
		<QrCode size={200} />
		<QrCodeValidator />
	</div>
}

export default Settings;
