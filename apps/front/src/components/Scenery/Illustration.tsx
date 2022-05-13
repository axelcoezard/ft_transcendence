import * as React from "react";
import BackgroundWaves from "./Background.waves";
import BackgroundBlobs from "./Background.blobs";
import Asteroides from "./Asteroides";
import Confetties from "./Confetties";
import styles from '../../styles/Illustration.module.scss'

function Illustration() {
  return <div className={styles.scenery}>
		<BackgroundWaves />
		<BackgroundBlobs />
		<Asteroides />
		<Confetties />
  	</div>
}

export default Illustration;