import styles from "../../../styles/Svg.module.scss";

const PlusIcon = (props: any) => {
	const { width, height} = props;

	return <svg className={styles.plus_icon} width={width} viewBox="0 0 17 18">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8.5 1.5v15M1 9h15"></path>
	</svg>
}

export default PlusIcon;
