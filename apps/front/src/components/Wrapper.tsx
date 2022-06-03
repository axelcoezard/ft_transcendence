import styles from '../styles/components/Wrapper.module.scss'
import Scenery from './assets/Scenery'
import { ChatNavLink, GameNavLink, Navigation, NavLink, NavLogout, ProfileNavLink, RankNavLink, SettingsNavLink } from "./Navigation";

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navigation>
			<NavLink href="/home" alt="Home"><GameNavLink /></NavLink>
			<NavLink href="/tchat" alt="Tchat"><ChatNavLink /></NavLink>
			<NavLink href="/rank" alt="Ranking"><RankNavLink /></NavLink>
			<NavLink href="/profil" alt="Profil"><ProfileNavLink /></NavLink>
			<NavLink href="/settings" alt="Settings"><SettingsNavLink /></NavLink>
			<NavLogout href="/logout" alt="Logout"></NavLogout>
		</Navigation>
		<Scenery/>
		{children}
	</main>
}

export default Wrapper;
