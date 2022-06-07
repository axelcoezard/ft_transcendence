import styles from '../styles/components/Wrapper.module.scss'
import Scenery from './assets/Scenery'
import { ChatNavLink, GameNavLink, Navigation, NavLink, NavLogout, ProfileNavLink, RankNavLink, SettingsNavLink } from "./Navigation";

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navigation>
			<NavLink href="/home" alt="Jouer"><GameNavLink /></NavLink>
			<NavLink href="/chat" alt="Chat"><ChatNavLink /></NavLink>
			<NavLink href="/ranking" alt="Classement"><RankNavLink /></NavLink>
			<NavLink href="/profil" alt="Profil"><ProfileNavLink /></NavLink>
			<NavLink href="/settings" alt="Parametres"><SettingsNavLink /></NavLink>
			<NavLogout href="/logout" alt="Deconnexion"></NavLogout>
		</Navigation>
		<Scenery/>
		{children}
	</main>
}

export default Wrapper;
