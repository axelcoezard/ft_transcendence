import styles from "../../../styles/Svg.module.scss";

const ReportIcon = (props: any) => {
	const { width, height } = props;

	return <svg className={styles.report_icon} width={width} height={height} fill="none" viewBox="0 0 40 41">
	<path fill="#D9D9D9" d="M15.58 23.152a1.25 1.25 0 001.769 1.767l7.07-7.07a1.25 1.25 0 10-1.767-1.768l-7.071 7.07z"></path>
		<path fill="#D9D9D9" fillRule="evenodd" d="M12.929 27.571c3.905 3.905 10.237 3.905 14.142 0 3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0-3.905 3.905-3.905 10.237 0 14.142zm12.374-1.768a7.5 7.5 0 11-10.606-10.606 7.5 7.5 0 0110.606 10.606z" clipRule="evenodd"></path>
	</svg>
}

export default ReportIcon;
