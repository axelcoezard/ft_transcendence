import * as React from "react";

import styles from '../../styles/Scenery.module.scss'

function FilterRocket() {
	return <defs className={styles.rocket}>
		<filter id="filter_rocket01" width="124.924" height="20.01" x="270.582" y="44.495" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feGaussianBlur result="effect1_foregroundBlur_413_3200" stdDeviation="2.5"> </feGaussianBlur>
		</filter>
		<filter id="filter_rocket02" width="11.993" height="50.051" x="388.506" y="29.475" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="-2"></feOffset>
			<feGaussianBlur stdDeviation="5" ></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"> </feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_413_3200"> </feBlend>
		</filter>
		<filter id="filter_rocket03" width="138.921" height="104.077" x="390.499" y="2.461" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dy="4"> </feOffset>
			<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
			<feComposite in2="hardAlpha" operator="out"> </feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_413_3200"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dy="-4"> </feOffset>
			<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
			<feComposite in2="hardAlpha" operator="out"></feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="effect1_dropShadow_413_3200" result="effect2_dropShadow_413_3200"> </feBlend>
			<feBlend in="SourceGraphic" in2="effect2_dropShadow_413_3200" result="shape"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="5" dy="-8"></feOffset>
			<feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" > </feComposite>
			<feColorMatrix values="0 0 0 0 0.141176 0 0 0 0 0.231373 0 0 0 0 0.427451 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="shape" result="effect3_innerShadow_413_3200"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="-8" dy="1"></feOffset>
			<feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
			<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"></feColorMatrix>
			<feBlend in2="effect3_innerShadow_413_3200" result="effect4_innerShadow_413_3200"> </feBlend>
		</filter>
		<filter id="filter_rocket04" width="33.98" height="34.031" x="457.46" y="37.485" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="-2" dy="-2"></feOffset>
			<feGaussianBlur stdDeviation="5"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_413_3200"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="2" dy="2"></feOffset>
			<feGaussianBlur stdDeviation="5"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" > </feComposite>
			<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="effect1_innerShadow_413_3200" result="effect2_innerShadow_413_3200"> </feBlend>
		</filter>
	</defs>
}

function LinearGradientRocket() {
	return <defs className={styles.rocket}  viewBox="0 0 530 109">	
		<linearGradient id="linear_gradient_rocket01" x1="273.743" x2="390.506" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop offset="0.306" stopColor="#fff" stopOpacity="0"> </stop>
			<stop offset="1" stopColor="#fff"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_rocket02" x1="-9.729" x2="400.499" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop stopColor="#7B61FF" stopOpacity="0"> </stop>
			<stop offset="0.505" stopColor="#ED657C" stopOpacity="0.5"> </stop>
			<stop offset="1" stopColor="#FFB3B3"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_rocket03" x1="393.504" x2="474.531" y1="108.045" y2="55.626" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"> </stop>
			<stop offset="1" stopColor="#243B6D"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_rocket04" x1="393.504" x2="472.537" y1="0.445" y2="54.877" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"> </stop>
			<stop offset="1" stopColor="#243B6D"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_rocket05" x1="442.971" x2="349.033" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop stopColor="#243B6D"> </stop>
			<stop offset="1" stopColor="#4379AB"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_rocket06" x1="372.518" x2="541.54" y1="110.557" y2="16.703" gradientUnits="userSpaceOnUse">
			<stop stopColor="#BB86FC"> </stop>
			<stop offset="0.495" stopColor="#60B5E7"> </stop>
			<stop offset="1" stopColor="#48DAC3"> </stop>
		</linearGradient>
	</defs>
}

function Rocket() {
	return <svg className={styles.rocket}  width="530" height="109" fill="none" viewBox="0 0 530 109">
		<g filter="url(#filter_rocket01)">
			<path fill="url(#linear_gradient_rocket01)" d="M275.582 51.163l114.924-1.668v10.01l-114.924-1.668v-6.674z"> </path>
		</g>
		<path fill="url(#linear_gradient_rocket02)" d="M.764 54.5C156.756 39.833 244.258 34.74 400.499 39.485v30.03C243.509 74.312 156.058 70.4.764 54.5z"> </path>
		<path fill="url(#linear_gradient_rocket03)" d="M410.992 90.535h40.973c-21.175 15.967-33.976 19.577-58.461 16.517l17.488-16.517z"> </path>
		<path fill="url(#linear_gradient_rocket04)" d="M410.992 17.955h40.973C430.79 1.988 417.989-1.622 393.504 1.438l17.488 16.517z"> </path>
		<g filter="url(#filter_rocket02)">
			<path fill="url(#linear_gradient_rocket0)" d="M390.506 29.475H400.49899999999997V79.52600000000001H390.506z"> </path>
		</g>
		<g filter="url(#filter_rocket03)">
			<path fill="url(#linear_gradient_rocket06)" d="M400.499 16.461c31.458.207 62.214-.511 84.399 6.846 22.186 7.357 34.604 21.736 34.522 31.934-.082 10.199-12.657 24.41-34.959 31.474-22.302 7.065-52.504 5.815-83.962 5.609V16.46z"> </path>
		</g>
		<g filter="url(#filter_rocket04)">
			<ellipse cx="474.45" cy="54.5" fill="#4379AB" rx="14.99" ry="15.015"> </ellipse>
		</g>
			<path stroke="#243B6D" strokeOpacity="0.5" strokeWidth="2" d="M488.44 54.5c0 7.742-6.265 14.015-13.99 14.015-7.725 0-13.99-6.273-13.99-14.015 0-7.742 6.265-14.015 13.99-14.015 7.725 0 13.99 6.273 13.99 14.015z"> </path>
		<FilterRocket />
		<LinearGradientRocket />
	</svg>
}

export default Rocket;