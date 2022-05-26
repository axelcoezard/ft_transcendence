import styles from '../styles/Components.module.scss'

const ProgressBar = (props: any) => {
	const { bgcolor, progress} = props;

		return <div className={styles.progress_bar}>
			<p className={styles.progress_bar_text}>15/150</p> {/* BACK */}
			<div className={styles.progress_bar_back}>
				<div style={{
					height: '100%',
					width: `${progress}%`,
					backgroundColor: bgcolor,
					borderRadius: "2.1vw",
					textAlign: 'right',
					paddingRight: "1vw",
				}}>
				</div>
			</div>
		</div>
}

export default ProgressBar;