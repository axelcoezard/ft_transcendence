import * as React from "react";

import styles from '../../styles/components/Scenery.module.scss'

function FilterTrailRocket() {
	return <defs className={styles.trail_rocket}>
		<filter id="filter_trail_rocket" width="124.924" height="20.01" x="270.582" y="44.495" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feGaussianBlur result="effect1_foregroundBlur_413_3200" stdDeviation="2.5"> </feGaussianBlur>
		</filter>
		<filter id="filter_trail_rocket02" width="11.993" height="50.051" x="388.506" y="29.475" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="-2"></feOffset>
			<feGaussianBlur stdDeviation="5" ></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"> </feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_413_3200"> </feBlend>
		</filter>
		<filter id="filter_trail_rocket03" width="138.921" height="104.077" x="390.499" y="2.461" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
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
		<filter id="filter_trail_rocket04" width="33.98" height="34.031" x="457.46" y="37.485" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
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

function LinearGradientTrailRocket() {
	return <defs className={styles.trail_rocket}  viewBox="0 0 530 109">
		<linearGradient id="linear_gradient_trail_rocket01" x1="273.743" x2="390.506" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop offset="0.306" stopColor="#fff" stopOpacity="0"> </stop>
			<stop offset="1" stopColor="#fff"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_trail_rocket02" x1="-9.729" x2="400.499" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop stopColor="#7B61FF" stopOpacity="0"> </stop>
			<stop offset="0.505" stopColor="#ED657C" stopOpacity="0.5"> </stop>
			<stop offset="1" stopColor="#FFB3B3"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_trail_rocket03" x1="393.504" x2="474.531" y1="108.045" y2="55.626" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"> </stop>
			<stop offset="1" stopColor="#243B6D"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_trail_rocket04" x1="393.504" x2="472.537" y1="0.445" y2="54.877" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"> </stop>
			<stop offset="1" stopColor="#243B6D"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_trail_rocket05" x1="442.971" x2="349.033" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
			<stop stopColor="#243B6D"> </stop>
			<stop offset="1" stopColor="#4379AB"> </stop>
		</linearGradient>
		<linearGradient id="linear_gradient_trail_rocket06" x1="372.518" x2="541.54" y1="110.557" y2="16.703" gradientUnits="userSpaceOnUse">
			<stop stopColor="#BB86FC"> </stop>
			<stop offset="0.495" stopColor="#60B5E7"> </stop>
			<stop offset="1" stopColor="#48DAC3"> </stop>
		</linearGradient>
	</defs>
}

function TrailRocket() {
	return <svg className={styles.trail_rocket}  width="530" height="109" fill="none" viewBox="0 0 530 109">
		<g filter="url(#filter_trail_rocket)">
			<path fill="url(#linear_gradient_trail_rocket01)" d="M275.582 51.163l114.924-1.668v10.01l-114.924-1.668v-6.674z"> </path>
		</g>
		<path fill="url(#linear_gradient_trail_rocket02)" d="M.764 54.5C156.756 39.833 244.258 34.74 400.499 39.485v30.03C243.509 74.312 156.058 70.4.764 54.5z"> </path>
		<path fill="url(#linear_gradient_trail_rocket03)" d="M410.992 90.535h40.973c-21.175 15.967-33.976 19.577-58.461 16.517l17.488-16.517z"> </path>
		<path fill="url(#linear_gradient_trail_rocket04)" d="M410.992 17.955h40.973C430.79 1.988 417.989-1.622 393.504 1.438l17.488 16.517z"> </path>
		<g filter="url(#filter_trail_trail_rocket02)">
			<path fill="url(#linear_gradient_trail_rocket0)" d="M390.506 29.475H400.49899999999997V79.52600000000001H390.506z"> </path>
		</g>
		<g filter="url(#filter_trail_trail_rocket03)">
			<path fill="url(#linear_gradient_trail_rocket06)" d="M400.499 16.461c31.458.207 62.214-.511 84.399 6.846 22.186 7.357 34.604 21.736 34.522 31.934-.082 10.199-12.657 24.41-34.959 31.474-22.302 7.065-52.504 5.815-83.962 5.609V16.46z"> </path>
		</g>
		<g filter="url(#filter_trail_trail_rocket04)">
			<ellipse cx="474.45" cy="54.5" fill="#4379AB" rx="14.99" ry="15.015"> </ellipse>
		</g>
			<path stroke="#243B6D" strokeOpacity="0.5" strokeWidth="2" d="M488.44 54.5c0 7.742-6.265 14.015-13.99 14.015-7.725 0-13.99-6.273-13.99-14.015 0-7.742 6.265-14.015 13.99-14.015 7.725 0 13.99 6.273 13.99 14.015z"> </path>
		<FilterTrailRocket />
		<LinearGradientTrailRocket />
	</svg>
}

function FilterCloudRocket() {
	return <defs className={styles.cloud_rocket}>
		<filter id="filter0_i_480_2281" width="40.809" height="45.456" x="81.58" y="114.123" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
			<feOffset dx="-2"> </feOffset>
			<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_480_2281"></feBlend>
			</filter>
			<filter id="filter1_ddii_480_2281" width="141.115" height="138.906" x="73.384" y="38.523" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
				<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dy="4"> </feOffset>
				<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
				<feComposite in2="hardAlpha" operator="out"> </feComposite>
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"> </feColorMatrix>
				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_480_2281" > </feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" > </feColorMatrix>
				<feOffset dy="-4"> </feOffset>
				<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
				<feComposite in2="hardAlpha" operator="out"> </feComposite>
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"> </feColorMatrix>
				<feBlend in2="effect1_dropShadow_480_2281" result="effect2_dropShadow_480_2281"> </feBlend>
				<feBlend in="SourceGraphic" in2="effect2_dropShadow_480_2281" result="shape" > </feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dx="5" dy="-8"> </feOffset>
				<feGaussianBlur stdDeviation="2.5"> </feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
				<feColorMatrix values="0 0 0 0 0.141176 0 0 0 0 0.231373 0 0 0 0 0.427451 0 0 0 0.25 0"> </feColorMatrix>
				<feBlend in2="shape" result="effect3_innerShadow_480_2281"> </feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dx="-8" dy="1"> </feOffset>
				<feGaussianBlur stdDeviation="2.5"> </feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
				<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"> </feColorMatrix>
				<feBlend in2="effect3_innerShadow_480_2281" result="effect4_innerShadow_480_2281"> </feBlend>
			</filter>
			<filter id="filter2_ii_480_2281" width="34.002" height="34.001" x="148.021" y="70.94" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
				<feFlood floodOpacity="0" result="BackgroundImageFix"> </feFlood>
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" > </feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dx="-2" dy="-2"></feOffset>
				<feGaussianBlur stdDeviation="5"></feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1"operator="arithmetic"> </feComposite>
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
				<feBlend in2="shape" result="effect1_innerShadow_480_2281"></feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dx="2" dy="2"> </feOffset>
				<feGaussianBlur stdDeviation="5"> </feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
				<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"> </feColorMatrix>
				<feBlend in2="effect1_innerShadow_480_2281" result="effect2_innerShadow_480_2281"> </feBlend>
			</filter>
	</defs>
}

function LinearGradientCloudRocket() {
	return <defs className={styles.cloud_rocket}>
		<linearGradient id="paint0_linear_480_2281" x1="134.531" x2="165.642" y1="180.095" y2="88.726" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"></stop>
			<stop offset="1" stopColor="#243B6D"></stop>
		</linearGradient>
		<linearGradient id="paint1_linear_480_2281" x1="67.981" x2="163.761" y1="95.684" y2="89.572" gradientUnits="userSpaceOnUse">
			<stop stopColor="#4379AB"></stop>
			<stop offset="1" stopColor="#243B6D"></stop>
		</linearGradient>
		<linearGradient id="paint2_linear_480_2281" x1="136.08" x2="42.08" y1="145.314" y2="145.314" gradientUnits="userSpaceOnUse">
			<stop stopColor="#243B6D"></stop>
			<stop offset="1" stopColor="#4379AB"></stop>
		</linearGradient>
		<linearGradient id="paint3_linear_480_2281" x1="119.593" x2="194.11" y1="195.068" y2="16.618" gradientUnits="userSpaceOnUse">
			<stop stopColor="#BB86FC"></stop>
			<stop offset="0.495" stopColor="#60B5E7"></stop>
			<stop offset="1" stopColor="#48DAC3"></stop>
		</linearGradient>
	</defs>
}

function CloudRocket() {
	return <svg className={styles.cloud_rocket} width="254" height="302" fill="none" viewBox="0 0 254 302">
		<path fill="#fff" d="M60.563 190.823c13.3-9.875 30.28-9.337 37.927 1.201 7.646 10.538 3.063 27.087-10.237 36.962-13.3 9.875-30.28 9.338-37.926-1.201-7.647-10.538-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M40.487 163.155c13.3-9.875 30.28-9.338 37.927 1.201 7.647 10.538 3.064 27.087-10.236 36.962-13.3 9.875-30.28 9.337-37.927-1.201-7.646-10.539-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M21.104 136.441c13.3-9.876 30.28-9.338 37.927 1.201 7.646 10.538 3.063 27.087-10.236 36.962-13.3 9.875-30.28 9.337-37.927-1.201-7.647-10.539-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M-2.374 124.511c13.3-9.875 30.28-9.337 37.927 1.201 7.646 10.539 3.064 27.087-10.236 36.962-13.3 9.876-30.28 9.338-37.927-1.201-7.646-10.538-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M-20.917 150.024c13.3-9.875 30.28-9.337 37.927 1.201 7.646 10.539 3.063 27.087-10.237 36.963-13.3 9.875-30.28 9.337-37.926-1.201-7.647-10.539-3.064-27.087 10.236-36.963zM49.634 226.831c13.3-9.875 30.28-9.337 37.927 1.201 7.647 10.539 3.064 27.087-10.236 36.962-13.3 9.875-30.28 9.338-37.927-1.201-7.646-10.538-3.063-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M30.251 200.117c13.3-9.875 30.28-9.338 37.927 1.201 7.646 10.538 3.063 27.087-10.236 36.962-13.3 9.875-30.28 9.337-37.927-1.201-7.647-10.538-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M8.791 170.54c13.3-9.875 30.28-9.337 37.927 1.201 7.646 10.539 3.063 27.087-10.237 36.963-13.3 9.875-30.28 9.337-37.926-1.201-7.647-10.539-3.064-27.087 10.236-36.963z"> </path>
		<path fill="#fff" d="M13.394 212.633c13.3-9.875 30.28-9.337 37.927 1.201 7.646 10.539 3.063 27.087-10.236 36.962-13.3 9.876-30.28 9.338-37.927-1.201-7.647-10.538-3.064-27.087 10.236-36.962z"> </path>
		<path fill="#fff" d="M-15.29 188.421c13.3-9.875 30.28-9.337 37.926 1.201 7.647 10.538 3.064 27.087-10.236 36.962-13.3 9.875-30.28 9.338-37.927-1.201-7.646-10.538-3.063-27.087 10.237-36.962zM88.355 128.155l22.833 29.769c-19.604 15.104-24.545 20.423-20.953 45.242l-51.114-63.072c31.741 8.598 30.224 2.707 49.234-11.939z"> </path>
		<path fill="url(#paint0_linear_480_2281)" d="M137.444 155.524l32.197-25.384c-6.765 25.645-14.591 36.408-35.724 49.176l3.527-23.792z"> </path>
		<path fill="url(#paint1_linear_480_2281)" d="M92.553 98.585l32.197-25.384c-26.515.593-38.807 5.692-56.155 23.261l23.958 2.123z"> </path>
		<g filter="url(#filter0_i_480_2281)">
			<path fill="url(#paint2_linear_480_2281)" d="M83.58 120.314H93.58V170.314H83.58z" transform="rotate(-38.252 83.58 120.314)"> </path>
		</g>
		<g filter="url(#filter1_ddii_480_2281)">
			<path fill="url(#paint3_linear_480_2281)" d="M83.384 103.915c24.848-19.327 48.572-38.945 70.556-46.918 21.984-7.973 40.636-4.386 46.879 3.665 6.243 8.051 5.15 26.99-8.006 46.35-13.155 19.359-37.661 37.089-62.509 56.416l-46.92-59.513z"> </path>
		</g>
		<g filter="url(#filter2_ii_480_2281)">
			<circle cx="165.022" cy="87.941" r="15" fill="#4379AB" transform="rotate(-38.252 165.022 87.94)"> </circle>
		</g>
		<circle cx="165.022" cy="87.941" r="14" stroke="#243B6D" strokeOpacity="0.5" strokeWidth="2" transform="rotate(-38.252 165.022 87.94)"> </circle>
		<FilterCloudRocket />
		<LinearGradientCloudRocket />
	</svg>
}

const ExportRockets = {
	TrailRocket,
	CloudRocket
};

export default ExportRockets;
