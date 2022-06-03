import {Link, useNavigate} from 'react-router-dom';
import useSession from '../hooks/useSession';

import styles from '../styles/components/Navigation.module.scss'

/* ---------- NAVIGATION SVGS ----------*/

const ProfileNavLink = () => {
	return  <svg className={styles.nav_bar_icons} viewBox="0 0 70 70">
		<path d="M0 5a5 5 0 015-5h60a5 5 0 015 5v60a5 5 0 01-5 5H5a5 5 0 01-5-5V5z"></path>
		<mask id="nav_link_mask01" style={{ maskType: "alpha" }} width="70" height="70" x="0" y="0" maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M0 0H70V70H0z"></path>
		</mask>
		<g mask="url(#nav_link_mask01)">
			<ellipse cx="35" cy="26.833" stroke="#fff" strokeWidth="2" rx="10.5" ry="10.5"></ellipse>
			<ellipse cx="35" cy="26.834" stroke="#fff" strokeWidth="2" rx="10.5" ry="10.5"></ellipse>
			<path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M52.5 52.5c0-1.839-.453-3.659-1.332-5.358-.88-1.698-2.169-3.242-3.794-4.542-1.625-1.3-3.554-2.33-5.677-3.034A21.355 21.355 0 0035 38.5c-2.298 0-4.574.362-6.697 1.066-2.123.703-4.052 1.734-5.677 3.034-1.625 1.3-2.914 2.844-3.794 4.542-.88 1.699-1.332 3.52-1.332 5.358"></path>
			<path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M52.5 52.5c0-1.839-.453-3.659-1.332-5.358-.88-1.698-2.169-3.242-3.794-4.542-1.625-1.3-3.554-2.33-5.677-3.034A21.355 21.355 0 0035 38.5c-2.298 0-4.574.362-6.697 1.066-2.123.703-4.052 1.734-5.677 3.034-1.625 1.3-2.914 2.844-3.794 4.542-.88 1.699-1.332 3.52-1.332 5.358"></path>
		</g>
	</svg>
}

const RankNavLink = () => {
	return <svg className={styles.nav_bar_icons} width="70" height="70" viewBox="0 0 70 70">
		<mask id="nav_link_mask01" style={{ maskType: "alpha" }} width="60" height="60" x="5" y="0" maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M5 0H65V60H5z"></path>
		</mask>
		<g mask="url(#nav_link_mask01)">
			<path fill="#fff" d="M15 24v-1a1 1 0 00-1 1h1zm13 0h1a1 1 0 00-1-1v1zM15 48h-1a1 1 0 001 1v-1zm13-36v-1a1 1 0 00-1 1h1zm13 0h1a1 1 0 00-1-1v1zm0 20v-1a1 1 0 00-1 1h1zm13 0h1a1 1 0 00-1-1v1zm0 16v1a1 1 0 001-1h-1zM15 25h13v-2H15v2zm12-1v24h2V24h-2zm1 23H15v2h13v-2zm-12 1V24h-2v24h2zm12-35h13v-2H28v2zm12-1v36h2V12h-2zm1 35H28v2h13v-2zm-12 1V12h-2v36h2zm12-15h13v-2H41v2zm12-1v16h2V32h-2zm1 15H41v2h13v-2zm-12 1V32h-2v16h2z"></path>
		</g>
	</svg>
}

const GameNavLink = () => {
	return  <svg className={styles.nav_bar_icons} viewBox="0 0 70 70">
		<mask id="mask0_157_1200" style={{ maskType: "alpha" }} width="60" height="60" x="5" y="5" maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M5 5H65V65H5z"></path>
		</mask>
		<g mask="url(#mask0_157_1200)">
			<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M41.71 21l-14.311.05a8.33 8.33 0 00-5.434 2.043 8.778 8.778 0 00-2.893 5.153v0l-2.667 14.075a4.808 4.808 0 00.395 2.892 4.627 4.627 0 001.983 2.09c.86.461 1.841.628 2.8.475a4.51 4.51 0 002.53-1.324v0l7.026-8 10.57-.05a8.337 8.337 0 005.98-2.548 8.832 8.832 0 002.478-6.154 8.832 8.832 0 00-2.477-6.153A8.337 8.337 0 0041.71 21v0z"></path>
			<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M50.184 29.75l2.248 12.843a4.593 4.593 0 01-.373 2.75 4.388 4.388 0 01-1.875 1.986 4.18 4.18 0 01-2.648.452 4.256 4.256 0 01-2.393-1.259L38.5 38.886M38.5 30.333h4.667M28 28v4.667M25.667 30.333h4.666"></path>
		</g>
	</svg>
}

const ChatNavLink = () => {
	return <svg className={styles.nav_bar_icons} viewBox="0 0 70 70">
		<mask id="mask0_157_1242" style={{ maskType: "alpha" }} width="60" height="60" x="5" y="5" maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M5 5H65V65H5z"></path>
		</mask>
		<g mask="url(#mask0_157_1242)">
			<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30.333 39.667H19.64c-.258 0-.505-.087-.688-.242a.77.77 0 01-.284-.585v-9.09c0-2.63 1.229-5.152 3.417-7.012 2.188-1.86 5.155-2.905 8.25-2.905 3.094 0 6.061 1.045 8.249 2.905C40.77 24.598 42 27.12 42 29.75s-1.23 5.152-3.417 7.012c-2.188 1.86-5.155 2.905-8.25 2.905z"></path>
			<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M29.167 39.667c.786 1.821 2.243 3.005 4.17 4.12 1.927 1.115 4.229 1.714 6.588 1.713h10.458c.252 0 .494-.082.672-.228a.714.714 0 00.278-.55V36.16c.004-2.39-1.113-4.691-3.12-6.427-2.009-1.735-3.297-2.773-6.213-2.9"></path>
		</g>
	</svg>
}

const SettingsNavLink = () => {
	return  <svg className={styles.nav_bar_icons} viewBox="0 0 70 70">
		<mask id="mask0_158_75" style={{ maskType: "alpha" }} width="60" height="60" x="5" y="5"maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M5 5H65V65H5z"></path>
		</mask>
		<g mask="url(#mask0_158_75)">
			<path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M48.217 26.693a8.97 8.97 0 01.557 5.664 9.24 9.24 0 01-2.978 4.919 9.893 9.893 0 01-5.402 2.338c-2.011.22-4.043-.17-5.812-1.114l-8.517 9.474A3.729 3.729 0 0123.483 49c-.968 0-1.896-.37-2.58-1.026a3.434 3.434 0 01-1.07-2.478c0-.93.385-1.82 1.07-2.478l9.868-8.177a9.002 9.002 0 01-1.16-5.579 9.147 9.147 0 012.435-5.186 9.798 9.798 0 015.123-2.86c1.977-.416 4.04-.229 5.9.536l-6.376 6.107.865 4.125 4.297.831 6.362-6.122z"></path>
		</g>
	</svg>
}

export { GameNavLink, ChatNavLink, SettingsNavLink, RankNavLink, ProfileNavLink }

/* ---------- NAVIGATION LINK  -----------*/
const NavLink = (props: any) => {
	return <Link
		className={styles.navigation_link}
		to={props.href}>
			<span>{props.alt}</span>
			{props.children}
	</Link>
}

const NavLogout = (props: any) => {
	const session = useSession("session")
	const navigate = useNavigate()

	const handleLogout = (e: any) => {
		e.preventDefault();
		session.clear()
		setTimeout(() => navigate("/"), 500)
	}

	return <button onClick={handleLogout} className={styles.navigation_link}>
		<span>{props.alt}</span>
		<img
			src="/svgs/nav_logout_icon.svg"
			className={styles.nav_bar_icons}
		/>
	</button>
}

/* ---------- NAVIGATION BAR -----------*/

const Navigation = (props: any) => {
	return <nav className={styles.navigation}>
		<ul className={styles.navigation_middle}>
			{props.children}
		</ul>
	</nav>
}

export { Navigation, NavLink, NavLogout }
