import {Link} from 'react-router-dom';

import styles from '../styles/Components.module.scss'
import LoginButton from './Buttons'

/* ---------- NAVIGATION SVGS ----------*/

const ProfileNavLink = () => {
	return  <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
		<path d="M0 5a5 5 0 015-5h60a5 5 0 015 5v60a5 5 0 01-5 5H5a5 5 0 01-5-5V5z"></path>
		<mask id="nav_link_mask01" style={{ maskType: "alpha" }} width="70" height="70" x="0" y="0" maskUnits="userSpaceOnUse">
			<path fill="#323232" d="M0 0H70V70H0z"></path>
		</mask>
		<g mask="url(#nav_link_mask01)">
			<g filter="url(#filter0_dii_167_764)">
				<circle cx="34.665" cy="58.665" r="4.665" fill="#60B5E7"></circle>
				<circle cx="34.665" cy="58.665" r="4.665" stroke="#60B5E7" strokeWidth="0.5"></circle>
			</g>
			<ellipse cx="35" cy="26.833" stroke="#fff" strokeWidth="2" rx="10.5" ry="10.5"></ellipse>
			<ellipse cx="35" cy="26.834" stroke="#fff" strokeWidth="2" rx="10.5" ry="10.5"></ellipse>
			<path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M52.5 52.5c0-1.839-.453-3.659-1.332-5.358-.88-1.698-2.169-3.242-3.794-4.542-1.625-1.3-3.554-2.33-5.677-3.034A21.355 21.355 0 0035 38.5c-2.298 0-4.574.362-6.697 1.066-2.123.703-4.052 1.734-5.677 3.034-1.625 1.3-2.914 2.844-3.794 4.542-.88 1.699-1.332 3.52-1.332 5.358"></path>
			<path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M52.5 52.5c0-1.839-.453-3.659-1.332-5.358-.88-1.698-2.169-3.242-3.794-4.542-1.625-1.3-3.554-2.33-5.677-3.034A21.355 21.355 0 0035 38.5c-2.298 0-4.574.362-6.697 1.066-2.123.703-4.052 1.734-5.677 3.034-1.625 1.3-2.914 2.844-3.794 4.542-.88 1.699-1.332 3.52-1.332 5.358"></path>
		</g>
		<defs>
			<filter id="filter0_dii_167_764" width="15.83" height="15.83" x="27.75" y="51.75" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
				<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
				<feOffset dx="1" dy="1"></feOffset>
				<feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
				<feComposite in2="hardAlpha" operator="out"></feComposite>
				<feColorMatrix values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 1 0"></feColorMatrix>
				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_167_764"></feBlend>
				<feBlend in="SourceGraphic" in2="effect1_dropShadow_167_764" result="shape"></feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
				<feOffset dx="1" dy="1"></feOffset>
				<feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
				<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"></feColorMatrix>
				<feBlend in2="shape" result="effect2_innerShadow_167_764"></feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
				<feOffset dx="-1" dy="-1"></feOffset>
				<feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
				<feBlend in2="effect2_innerShadow_167_764" result="effect3_innerShadow_167_764"></feBlend>
			</filter>
		</defs>
	</svg>
}

/* -------- NAVIGATION ELEMENTS --------*/

const Navbar = (props: any) => {
	return <nav className={styles.nav_bar}>
		<ul className={styles.middle}>{props.children}</ul>
		<ul className={styles.right}>
		</ul>
	</nav>
}

const Navlink = (props: any) => {
	return <Link to={props.href}>{props.children}</Link>
}

/* ---------- NAVIGATION BAR -----------*/

const DefaultNavBar = () => {
	return <Navbar>
		<Navlink href="/home"><ProfileNavLink /></Navlink>
		<Navlink href="/tchat">Tchat</Navlink>
		<Navlink href="/play">Play</Navlink>
	</Navbar>
}

export default DefaultNavBar;
