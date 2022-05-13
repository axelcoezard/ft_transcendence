import * as React from "react";

import styles from '../../styles/Illustration.module.scss'

// ROUND CONFETTIES

function RoundFilterConfetties() {
	return <defs>
		<filter id="round_filter_confetties" width="18.769" height="21.639" x="6.052" y="10.191"
			colorInterpolationFilters="sRGB"
			filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dy="4"> </feOffset>
			<feGaussianBlur stdDeviation="2"></feGaussianBlur>
			<feComposite in2="hardAlpha" operator="out"></feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_614_1109"> </feBlend>
			<feBlend in="SourceGraphic" in2="effect1_dropShadow_614_1109" result="shape"> </feBlend>
		</filter>
		<filter id="round_filter_shadows" width="30.769" height="33.639" x="0.052" y="0.191"
			colorInterpolationFilters="sRGB"
			filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feGaussianBlur result="effect1_foregroundBlur_614_1109" stdDeviation="5"> </feGaussianBlur>
		</filter>
	</defs>
}

function RoundWhiteConfetti(props: any) {
	return <svg className={styles.round_white_confetti} viewBox="0 0 31 34">
		<g filter="url(#round_filter_confetties)">
			<ellipse cx="15.437" cy="17.011" rx="5.385" ry="6.82"> </ellipse>
		</g>
		<g filter="url(#round_filter_shadows)">
			<ellipse cx="15.437" cy="17.011" rx="5.385" ry="6.82"> </ellipse>
		</g>
		<RoundFilterConfetties />
	</svg>
}

function RoundBlueConfetti(props: any) {
	return <svg className={styles.round_blue_confetti} viewBox="0 0 32 35" >
		<g filter="url(#round_filter_confetties)">
			<ellipse cx="15.898" cy="17.238" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<g filter="url(#round_filter_shadows)">
			<ellipse cx="15.898" cy="17.238" rx="5.385" ry="6.819"></ellipse>
		</g>
		<RoundFilterConfetties />
	</svg>
}

function RoundGreenConfetti(props: any) {
	return  <svg className={styles.round_green_confetti} viewBox="0 0 31 34">
		<g filter="url(#round_filter_confetties)">
			<ellipse cx="15.514" cy="16.822" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<g filter="url(#round_filter_shadows)">
			<ellipse cx="15.514" cy="16.822" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<RoundFilterConfetties />
	</svg>
}

function RoundPurpleConfetti(props: any) {
	return <svg className={styles.round_purple_confetti} viewBox="0 0 32 35">
		<g filter="url(#round_filter_confetties)">
			<ellipse cx="16.283" cy="17.75" fill="#DDC3FE" rx="5.385" ry="6.819" > </ellipse>
		</g>
		<g filter="url(#round_filter_shadows)">
			<ellipse cx="16.283" cy="17.75" fill="#DDC3FE" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<RoundFilterConfetties />
	</svg>
}

function RoundRedConfetti(props: any) {
	return     <svg className={styles.round_red_confetti} viewBox="0 0 32 34">
		<g filter="url(#round_filter_confetties)">
			<ellipse cx="15.668" cy="16.978" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<g filter="url(#round_filter_shadows)">
			<ellipse cx="15.668" cy="16.978" rx="5.385" ry="6.819"> </ellipse>
		</g>
		<RoundFilterConfetties />
	</svg>
}

// SQUARE CONFETTI

function SquareFilterConfetties() {
	return <defs>
		<filter id="square_filter_confetties" width="26.331" height="28.018" x="0.305" y="0.985"
			colorInterpolationFilters="sRGB"
			filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feGaussianBlur result="effect1_foregroundBlur_614_1090"stdDeviation="5"> </feGaussianBlur>
		</filter>
	</defs>
}

function SquareWhiteConfetti(props: any) {
	return <svg className={styles.square_white_confetti} viewBox="0 0 28 29">
		<path  d="M0 0H5.446V6.77H0z" transform="matrix(.96978 -.244 .15497 .98792 10.748 11.684)"> </path>
		<g filter="url(#round_filter_shadows)">
			<path  d="M0 0H5.446V6.77H0z" transform="matrix(.96978 -.244 .15497 .98792 10.748 11.684)"> </path>
		</g>
	</svg>
}

function SquareBlueConfetti(props: any) {
	return <svg className={styles.square_blue_confetti} viewBox="0 0 28 29">
		<path d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.901 11.892)"> </path>
		<g filter="url(#round_filter_shadows)">
			<path d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.901 11.892)"> </path>
		</g>
	</svg>
}

function SquareGreenConfetti(props: any) {
	return  <svg className={styles.square_green_confetti} viewBox="0 0 28 30" >
		<path d="M0 0H6.067V6.22H0z" transform="matrix(.6602 .7511 -.57855 .81565 13.619 10.172)" > </path>
		<g filter="url(#round_filter_shadows)">
			<path d="M0 0H6.067V6.22H0z" transform="matrix(.6602 .7511 -.57855 .81565 13.619 10.172)"> </path>
		</g>
	</svg>
}

function SquarePurpleConfetti(props: any) {
	return <svg className={styles.square_purple_confetti} viewBox="0 0 27 30">
		<path d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.305 12.314)"> </path>
		<g filter="url(#round_filter_shadows)">
			<path  d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.305 12.314)"> </path>
		</g>
		<SquareFilterConfetties />
	</svg>
}

function SquareRedConfetti(props: any) {
	return  <svg className={styles.square_red_confetti} viewBox="0 0 27 29">
		<path d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.44 11.928)" > </path>
		<g filter="url(#round_filter_shadows)">
			<path d="M0 0H5.446V6.771H0z" transform="matrix(.96978 -.244 .15497 .98792 10.44 11.928)"> </path>
		</g>
	</svg>
}

// CONFETTIES PATERN

function PatternSampleConfetties(props: any) {
	return  <div className={styles.pattern_element_confetties}>
		<RoundWhiteConfetti />
		<SquareBlueConfetti />
		<SquarePurpleConfetti />
		<RoundRedConfetti />
		<SquareGreenConfetti />
		<RoundBlueConfetti />
		<RoundGreenConfetti />
		<RoundPurpleConfetti />
		<SquareWhiteConfetti />
		<SquareRedConfetti />
	</div>
}

function PatternElementConfetties(props: any) {
	return <div className={styles.pattern_confetties}>
		<PatternSampleConfetties />
		<PatternSampleConfetties />
	</div>
}

function Confetties(props: any) {
	return <div className={styles.confetties}>
		<PatternElementConfetties />
	</div>
}

export default Confetties;