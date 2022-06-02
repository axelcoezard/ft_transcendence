import * as React from "react";

import styles from '../../styles/components/Scenery.module.scss'

// SHOOTING STARS TRAIL

function TrailShootingStars() {
	return <defs>
		<linearGradient id="blue_star_trail" x1="0.167" x2="319.348" y1="17.262" y2="6.363" gradientUnits="userSpaceOnUse">
			<stop offset="0.146" stopColor="#60B5E7"></stop>
			<stop offset="0.817" stopColor="#A4EDE1" stopOpacity="0"></stop>
		</linearGradient>
		<linearGradient id="purple_star_trail" x1="230.798" x2="18.446" y1="13.303" y2="230.236" gradientUnits="userSpaceOnUse">
			<stop offset="0.146" stopColor="#DDC3FE"></stop>
			<stop offset="0.817" stopColor="#B0DAF3" stopOpacity="0"></stop>
		</linearGradient>
		<linearGradient id="green_star_trail" x1="206.675" x2="24.729" y1="203.271" y2="-31.533" gradientUnits="userSpaceOnUse">
			<stop offset="0.146" stopColor="#A4EDE1"></stop>
			<stop offset="0.817" stopColor="#DDC3FE" stopOpacity="0"></stop>
		</linearGradient>
	</defs>
}

// COLORFUL SHOOTINGS STARS

function BlueShootingStars() {
	return <svg className={styles.blue_shooting_star} viewBox="0 0 291 89">
		<ellipse rx="25.244" ry="11.662" transform="matrix(.98353 .18066 .00962 .99996 24.995 21.833)"> </ellipse>
		<path fill="url(#blue_star_trail)" d="M.168 17.262c-1.171-35.037 289.591 47.357 290.427 46.84l.063 6.489.062 6.489S1.34 52.297.168 17.261z"> </path>
		<TrailShootingStars />
	</svg>
}

function PurpleShootingStars() {
	return <svg className={styles.purple_shooting_star} viewBox="0 0 244 197">
		<ellipse rx="23.645" ry="12.301" transform="matrix(-.78794 .6159 -.69906 -.7152 212.167 27.867)"> </ellipse>
		<path fill="url(#purple_star_trail)" d="M230.798 13.303C257.16 39.144 17.75 187.577 17.613 188.577l-4.787-4.897-4.787-4.898S204.436-12.535 230.798 13.304z"> </path>
		<TrailShootingStars />
	</svg>
}

function GreenShootingStars() {
	return <svg className={styles.green_shooting_star} viewBox="0 0 222 215">
		<ellipse rx="23.118" ry="12.644" transform="matrix(-.70811 -.70627 .80324 -.59585 190.306 186.944)"> </ellipse>
		<path fill="url(#green_star_trail)" d="M206.675 203.27c-29.849 23.1-196.06-186.731-197.2-186.851l5.655-4.195 5.654-4.195S236.523 180.171 206.675 203.27z"> </path>
		<TrailShootingStars />
	</svg>
}

// SHOOTING STARS

function ShootingStars() {
	return <div>
		<BlueShootingStars />
		<PurpleShootingStars />
		<GreenShootingStars />
	</div>
}

export default ShootingStars;
