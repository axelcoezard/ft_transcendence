import {Link} from 'react-router-dom';

import styles from '../styles/Navigation.module.scss'
import LoginButton from './LoginButton'

const Navbar = (props: any) => {
	return <nav className={styles.parent}>
		<div className={styles.container}>
			<ul className={styles.left}>
				<h1 className={styles.brand}>Transcendence</h1>
			</ul>
			<ul className={styles.middle}>{props.children}</ul>
			<ul className={styles.right}>
				<LoginButton />
			</ul>
		</div>
	</nav>
}

const Navlink = (props: any) => {
	return <Link to={props.href}>{props.children}</Link>
}

export {Navbar, Navlink}
