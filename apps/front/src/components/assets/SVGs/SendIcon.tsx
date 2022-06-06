import styles from "../../../styles/Svg.module.scss";

const SendIcon = (props: any) => {
	const { width, height } = props;

	return <svg className={styles.send_icon} fill="none" viewBox="0 0 23 23">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.099 11.5h6.923m9.032-.682l-18.27-9.22a.946.946 0 00-.98.088.775.775 0 00-.275.393.707.707 0 00.022.464l3.44 8.694a.638.638 0 010 .526l-3.44 8.694a.707.707 0 00-.022.464c.046.154.142.29.276.393a.946.946 0 00.98.089l18.269-9.22a.832.832 0 00.326-.287.722.722 0 00.12-.396.722.722 0 00-.12-.396.832.832 0 00-.326-.286z"></path>
	</svg>
}
export default SendIcon;
