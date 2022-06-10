import styles from '../../styles/pages/Play.module.scss'

const PlayCountdown = (props: any) => {
	const {countdown} = props;
	return <div className={styles.play_countdown}>
		<h1>{countdown > 0 ? countdown : "GO"}</h1>
	</div>
}

export default PlayCountdown;
