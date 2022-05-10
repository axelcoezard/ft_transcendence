import React from "react";

import styles from '../../styles/Illustration.module.scss'

const Wave01 = () => {
	return <svg width="590" height="301" viewBox="0 0 590 301">
		<path className={styles.waves}
			d="M0 200.767V0h590s-64.285 54.634-115.912 125.097c-68.524 93.523-135.69 234.884-284.563 149.591C40.652 189.395 0 200.767 0 200.767z">
		</path>
	</svg>
}

const Wave02 = () => {
	return <svg width="537" height="345" viewBox="0 0 537 345">
		<path className={styles.waves}
			d="M0 229.5V0h537s-58.511 62.453-105.5 143c-62.368 106.908-123.5 268.5-259 171S0 229.5 0 229.5z">
		</path>
	</svg>
}

const Waves = () => {
	return <div className="scenary">
		<Wave01 />
		<Wave02 />
	</div>;
}

export default Waves;