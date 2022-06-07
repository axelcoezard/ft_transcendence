import BackgroundWaves from "./Background.waves";
import Asteroides from "./Asteroides";
import Confetties from "./Confetties";
import ShootingStars from "./Shooting.stars";
import Planets from "./Planets";
import FrameWaves from "./Frame.waves";
import Rockets from "./Rocket";
import styles from '../../styles/components/Scenery.module.scss'
// import { Parallax } from 'react-parallax';

const DefaultScenery = () => {
	return <div className={styles.scenery}>
		<Asteroides />
		<Confetties />
		<Planets />
		<ShootingStars />
	</div>
}

export default DefaultScenery;

