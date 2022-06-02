
import styles from "../../../styles/Svg.module.scss";


const CrossIcon = (props: any) => {
	const { width, height } = props;

	return <svg className={styles.cross_icon} width={width} height={height} fill="none" viewBox="0 0 22 22">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 1L1 21m20 0L1 1"></path>
	</svg>
}

export default CrossIcon;
