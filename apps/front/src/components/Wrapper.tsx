import styles from '../styles/components/Wrapper.module.scss'
import Scenery from './assets/Scenery'
import { ChatNavLink, GameNavLink, Navigation, NavLink, ProfileNavLink, RankNavLink, SettingsNavLink } from "./Navigation";

const Wrapper = ({children}: {children: any}) => {
	return <main className={styles.wrapper}>
		<Navigation>
			<NavLink href="/home"><GameNavLink /></NavLink>
			<NavLink href="/tchat"><ChatNavLink /></NavLink>
			<NavLink href="/rank"><RankNavLink /></NavLink>
			<NavLink href="/profil"><ProfileNavLink /></NavLink>
			<NavLink href="/settings"><SettingsNavLink /></NavLink>
		</Navigation>
		<Scenery/>
		{children}
	</main>
}

export default Wrapper;
