import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.scss'
import btn_styles from '../styles/Buttons.module.scss'
import Avatars from '../components/Avatars'
import Buttons from '../components/Buttons'
import HomeIllustrations from '../components/SVGs/HomeIllustrations'
import { Link, useNavigate } from 'react-router-dom';

/* -------------- HOME SVG -------------*/

const MatchmakeButton = () => {
	const {session, socket} = useAppContext()
	const navigate = useNavigate()

	const handleClick = () => {
		alert("matchmaking...");

		socket.emit("join", "lobby", "", {
			id: session.get("id"),
			username: session.get("username")
		})

		return navigate("/matching")
	}

	return <div className={styles.random}>
				<HomeIllustrations.RandomIllustration /> {/* TO-DO: Link to random game */}
				<h1 className={styles.h1}>random</h1>
				<h3 className={styles.h3}>Pong with a random player.</h3>
				<button className={btn_styles.play_button}
					onClick={handleClick}
				>
					<div className={btn_styles.play_button_icon} />
				</button>
			</div>;
}

const DuelButton = () => {

	return <div className={styles.invite}>
				<HomeIllustrations.InviteIllustration /> {/* TO-DO: Link to invite game */}
				<h1 className={styles.h1}>invite</h1>
				<h3 className={styles.h3}>Challenge a friend at pong.</h3>
				<Link className={btn_styles.play_button} to="/play">
					<div className={btn_styles.play_button_icon} />
				</Link>
			</div>
}

const WatchButton = () => {
	return <div className={styles.view}>
				<HomeIllustrations.ViewIllustration />  {/* TO-DO: Link to view game */}
				<h1 className={styles.h1}>view</h1>
				<h3 className={styles.h3}>Don't pong, watch pong.</h3>
				<Link className={btn_styles.play_button} to="/play/">
					<div className={btn_styles.play_button_icon} />
				</Link>
			</div>
}

const Home = () => {
	const {session} = useAppContext()

	return <main className={styles.home}>
		<section className={styles.header}>
			<div className={styles.header_container}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>
			<div className={styles.header_avatar}>
				<Avatars.PurpleAvatar width="3.9vw" height="3.9vw"/> {/* TO-DO: Link to profil */}
				<p className={styles.text}> {session.get("username")}</p>
			</div>
		</section>
		<section className={styles.game}>
			<MatchmakeButton />
			<DuelButton />
			<WatchButton />
		</section>
	</main>
}

export default Home;
