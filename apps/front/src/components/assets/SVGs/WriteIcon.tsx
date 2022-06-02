import styles from "../../../styles/Svg.module.scss"

const WriteIcon = (props: any) => {
	const { width, height } = props;

	return <svg className={styles.write_icon} width={width} height={height} fill="none" viewBox="0 0 23 22">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.228 3.386l5.219 5.219M1.833 21h5.219l13.7-13.7a3.69 3.69 0 00-5.22-5.22l-13.7 13.7V21z"></path>
	</svg>
}

export default WriteIcon;
