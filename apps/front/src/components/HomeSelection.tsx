import styles from "../styles/Components.module.scss"
import HomeIllustrations from '../components/SVGs/HomeIllustrations'
import btn_styles from '../styles/Buttons.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext'

const HomeSelectionRandom = (props: any) => {
	const {url} = props;

	return <div className={styles.home_selection_random}>
		<HomeIllustrations.RandomIllustration /> {/* TO-DO: Link to random game */}
		<h1 className={styles.home_selection_h1}>random</h1>
		<h3 className={styles.home_selection_h3}>Pong with a random player.</h3>
		<Link className={btn_styles.play_button} to={url}>
			<div className={btn_styles.play_button_icon} />
		</Link>
	</div>;
}

const HomeSelectionInvite = () => {
	const {session, socket} = useAppContext()
	const navigate = useNavigate()

	const handleClick = () => {
		alert("matchmaking...");

		socket.emit("join", "lobby", "", {
			id: session.get("id"),
			username: session.get("username")
		})

		return navigate("/matching_invite")
	}

	return <div className={styles.home_selection_invite}>
		<HomeIllustrations.InviteIllustration /> {/* TO-DO: Link to invite game */}
		<h1 className={styles.home_selection_h1}>invite</h1>
		<h3 className={styles.home_selection_h3}>Challenge a friend at pong.</h3>
		<button className={btn_styles.play_button} onClick={handleClick}>
			<div className={btn_styles.play_button_icon} />
		</button>
	</div>
}

const HomeSelectionView = () => {
	const {session, socket} = useAppContext()
	const navigate = useNavigate()

	const handleClick = () => {
		alert("matchmaking...");

		socket.emit("join", "lobby", "", {
			id: session.get("id"),
			username: session.get("username")
		})

		return navigate("/matching_view")
	}

	return <div className={styles.home_selection_view}>
		<HomeIllustrations.ViewIllustration />  {/* TO-DO: Link to view game */}
		<h1 className={styles.home_selection_h1}>view</h1>
		<h3 className={styles.home_selection_h3}>Don't pong, watch pong.</h3>
		<button className={btn_styles.play_button} onClick={handleClick}>
			<div className={btn_styles.play_button_icon} />
		</button>
	</div>
}

const ExportHomeSelection = {
	HomeSelectionRandom,
	HomeSelectionInvite,
	HomeSelectionView
}

export default ExportHomeSelection;