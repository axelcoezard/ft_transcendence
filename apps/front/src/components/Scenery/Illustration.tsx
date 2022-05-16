import * as React from "react";
import BackgroundWaves from "./Background.waves";
import BackgroundBlobs from "./Background.blobs";
import Asteroides from "./Asteroides";
import Confetties from "./Confetties";
import ShootingStars from "./Shooting.stars";
import Planets from "./Planets";
import FrameWaves from "./Frame.waves";
import Rocket from "./Rocket";
import styles from '../../styles/Illustration.module.scss'

function Illustration() {
  return <g className={styles.scenery}>
		<BackgroundWaves />
		<BackgroundBlobs />
		<Asteroides />
		<Confetties />
		<Planets />
		<ShootingStars />
		<Rocket />
		<FrameWaves />
  	</g>
}

export default Illustration;
