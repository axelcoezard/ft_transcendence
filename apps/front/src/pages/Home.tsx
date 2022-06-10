import styles from '../styles/pages/Home.module.scss'
import useSession from '../hooks/useSession'
import { Link } from 'react-router-dom';

const HomeSelector = (props: any) => {
	const {title, subtitle, icon, path} = props;

	return <li className={styles.home_selector}>
		<div className={styles.home_selector_icon}>
			<img src={`/svgs/home_${icon}_icon.svg`} alt={title}/>
		</div>
		<div className={styles.home_selector_rest}>
			<div className={styles.home_selector_title}>
				<h2>{title}</h2>
				<p >{subtitle}</p>
			</div>
			<div className={styles.home_selector_link}>
				<Link to={path}>GO</Link>
			</div>
		</div>
	</li>
}

const Home = () => {
	const session = useSession("session")

	const items = [
		{title:"RANKED", subtitle:"Jouer contre un joueur de votre niveau", icon:"ranked", path:"/play/wait"},
		{title:"WATCH", subtitle:"Regarder une partie en cours", icon:"watch", path:"/play/watch"},
		{title:"MESSAGE", subtitle:"Inviter un ami a discuter", icon:"duel", path:"/chat/invite"},
	]

	return <main className={styles.home}>
		<div className={styles.home_header}>
			<div className={styles.home_header_container}>
				<h1>TRANSCENDENCE</h1>
				<p>Pong to the extreme!</p>
			</div>
		</div>
		<ul className={styles.home_selectors}>
			{items.map((item, index) => <HomeSelector key={index} {...item} />)}
		</ul>
	</main>
}

export default Home;
