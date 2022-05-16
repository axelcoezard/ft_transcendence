import * as React from "react";
import BackgroundWaves from "./Background.waves";
import Asteroides from "./Asteroides";
import Confetties from "./Confetties";
import ShootingStars from "./Shooting.stars";
import Planets from "./Planets";
import FrameWaves from "./Frame.waves";
import Rocket from "./Rocket";
import styles from '../../styles/Scenery.module.scss'

function Scenery() {
  return <div className={styles.scenery}>
		<BackgroundWaves />
		<Asteroides />
		<Confetties />
		<Planets />
		<ShootingStars />
		<FrameWaves />
  	</div>
}

export default Scenery;
