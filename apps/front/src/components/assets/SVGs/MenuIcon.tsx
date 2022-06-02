import styles from "../../../styles/Svg.module.scss";

const MenuIcon = (props: any) => {
	const { width, height } = props;

	return  <svg className={styles.menu_icon} width={width} height={height} fill="none" viewBox="0 0 40 40">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10h20M10 20h20M10 30h20"></path>
	</svg>
}

export default MenuIcon;
