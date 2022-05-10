import * as React from "react";
import FrameWaves from "./Frame.waves";
import BackgroundWaves from "./Background.waves";
import styles from '../../styles/Illustration.module.scss'

function Illustration() {
  return <div className={styles.scenery}>
		<BackgroundWaves />
		<FrameWaves />
  	</div>
}

export default Illustration;