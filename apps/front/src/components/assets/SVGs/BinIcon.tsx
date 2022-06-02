import styles from "../../../styles/Svg.module.scss";

const BinIcon = (props: any) => {
	const { width, height} = props;

	return <svg className={styles.bin_icon} width={width} height={height} fill="none" viewBox="0 0 22 22">
		<path stroke="#fff" strokeLinecap="round" strokeWidth="1" d="M1 5.286h20m-10 5v7.143m-4-4.286v4.286m8-4.286v4.286M7 4.57V2.43C7 1.639 7.597 1 8.333 1h5.334C14.403 1 15 1.64 15 2.429V4.57H7zm-4 .715V19.57C3 20.361 3.597 21 4.333 21h13.334c.736 0 1.333-.64 1.333-1.429V5.286H3z"></path>
	</svg>
}

export default BinIcon;
