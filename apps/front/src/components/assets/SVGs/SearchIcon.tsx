import styles from "../../../styles/Svg.module.scss";

const SearchIcon = (props: any) => {
	const { width, height } = props;

	return  <svg className={styles.search_icon} width={width} height={height} fill="none" viewBox="0 0 22 22">
		<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="1" strokeWidth="1s" d="M21 21l-6.667-6.667m2.223-5.555A7.778 7.778 0 111 8.778a7.778 7.778 0 0115.556 0z"></path>
	</svg>
}

export default SearchIcon;

