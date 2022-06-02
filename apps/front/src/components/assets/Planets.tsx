import * as React from "react";

import styles from '../../styles/components/Scenery.module.scss'

// FILL IN PLANETS

function RadialGradientPlanets() {
	return <defs>
		<radialGradient id="radial_gradient_planets" cx="0" cy="0" r="1" gradientTransform="rotate(57.334 336.959 103.035) scale(664.702 1439.85)" gradientUnits="userSpaceOnUse">
			<stop stopColor="#fff" stopOpacity="0.5"></stop>
			<stop offset="0.371" stopColor="#7B61FF" stopOpacity="0"></stop>
		</radialGradient>
	</defs>
}

// BIG PLANET :

function BigPlanet() {
	return <svg className={styles.big_planet} viewBox="0 0 601 324">
		<mask id="big_planet_mask" style={{ maskType: "alpha" }} width="601" height="602" x="0" y="-278" maskUnits="userSpaceOnUse">
			<ellipse cx="300.79" cy="23.023" fill="url(#big_planet_fill01)" rx="299.802" ry="300.306" > </ellipse>
		</mask>
		<g mask="url(#big_planet_mask)">
			<ellipse cx="300.79" cy="23.023" fill="url(#big_planet_fill02)" rx="299.802" ry="300.306"> </ellipse>
			<path fillOpacity="0.25" d="M-86.645-38.727S-64.26.605-44.473 20.835c18.927 19.35 35.824 23.658 55.785 41.982 40.051 36.768 49.697 69.367 82.545 112.939 33.249 44.103 44.409 76.157 86.737 111.522 21.12 17.645 35.424 24.864 59.099 39.655 22.966 14.348 60.217 35.051 60.217 35.051l-56.054 54.257s-67.881-50.167-102.787-90.705c-36.113-41.94-40.469-79.384-77.395-120.565-36.25-40.427-73.398-46.328-108.417-87.898-28.498-33.829-13.502-85.202-59.784-97.987-13.555-3.745-38.172-3.557-38.172-3.557l56.054-54.256zM-48.635-147.397s43.639 34.324 66.149 61.284c21.532 25.789 26.424 45.795 46.83 72.506C105.288 39.99 141.387 58.422 189.793 105.5c48.997 47.653 84.505 67.66 123.918 123.492 19.664 27.857 27.753 45.624 44.284 75.692 16.036 29.167 39.207 75.878 39.207 75.878l59.513-50.425s-55.97-88.013-101.04-136.701c-46.629-50.371-88.04-63.978-133.836-115.088-44.958-50.173-51.771-93.326-97.982-142.38-37.606-39.92-94.257-35.003-108.749-90.03-4.244-16.116-4.23-43.76-4.23-43.76l-59.513 50.425zM568.209 322.986s-39.131-58.291-69.813-90.848c-29.349-31.143-52.062-42.023-82.453-72.147-60.979-60.445-82.05-105.986-135.67-173.067-54.275-67.9-77.131-113.2-140.638-172.524-31.686-29.599-51.875-43.47-86.054-70.142-33.154-25.871-86.242-64.482-86.242-64.482l56.916-53.348S124.34-286.98 179.769-223.217c57.347 65.968 72.972 116.184 131.152 181.415 57.114 64.036 106.089 83.3 161.939 148.444 45.451 53.014 40.137 115.382 102.615 146.472 18.298 9.106 49.651 16.524 49.651 16.524l-56.916 53.348zM279.114-339.032s22.383 39.332 42.171 59.562c18.928 19.351 35.825 23.658 55.785 41.982 40.051 36.767 49.697 69.367 82.545 112.938 33.249 44.104 44.409 76.157 86.738 111.523 21.119 17.645 35.423 24.863 59.099 39.655 22.965 14.348 60.216 35.051 60.216 35.051l-56.054 54.256S541.733 65.768 506.827 25.23c-36.113-41.94-40.468-79.384-77.395-120.565-36.25-40.426-73.398-46.328-108.416-87.897-28.498-33.829-13.503-85.202-59.784-97.988-13.555-3.744-38.173-3.556-38.173-3.556l56.055-54.256z"> </path>
			<ellipse cx="300.79" cy="23.023" fill="url(#radial_gradient_planets)" rx="299.802" ry="300.306"> </ellipse>
		</g>
		<defs>
			<linearGradient id="big_planet_fill01" x1="0.988" x2="601.598" y1="-277.282" y2="322.32" gradientUnits="userSpaceOnUse">
				<stop stopColor="#BB86FC"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<linearGradient
				id="big_planet_fill02" x1="0.988" x2="601.598" y1="-277.282" y2="322.32" gradientUnits="userSpaceOnUse">
				<stop stopColor="#7B61FF"></stop>
				<stop offset="1" stopColor="#DDC3FE"></stop>
				</linearGradient>
			<RadialGradientPlanets />
		</defs>
	</svg>
}

// MEDIUM PLANET

function MediumPlanet() {
	return  <svg className={styles.medium_planet} viewBox="0 0 301 301">
		<mask id="medium_planet_mask" style={{ maskType: "alpha" }} width="301" height="301" x="0" y="0" maskUnits="userSpaceOnUse">
			<ellipse cx="150.203" cy="150.693" fill="url(#medium_planet_fill01)" rx="149.901" ry="150.153" > </ellipse>
		</mask>
		<g mask="url(#medium_planet_mask)">
			<ellipse cx="150.203" cy="150.693" fill="url(#medium_planet_fill02)" rx="149.901"ry="150.153" > </ellipse>
			<path fillOpacity="0.25" d="M-43.515 119.818s11.192 19.666 21.086 29.781c9.464 9.675 17.912 11.829 27.893 20.991 20.025 18.383 24.848 34.683 41.272 56.469 16.625 22.052 22.205 38.079 43.369 55.761 10.56 8.823 17.712 12.432 29.549 19.828 11.483 7.174 30.109 17.525 30.109 17.525l-28.028 27.128s-33.94-25.083-51.393-45.352c-18.056-20.97-20.234-39.692-38.697-60.283-18.125-20.213-36.7-23.164-54.209-43.948-14.249-16.915-6.75-42.601-29.892-48.994-6.777-1.872-19.086-1.778-19.086-1.778l28.027-27.128zM-24.51 65.483S-2.69 82.644 8.565 96.124c10.766 12.895 13.212 22.898 23.415 36.254 20.472 26.798 38.521 36.014 62.724 59.553 24.499 23.826 42.253 33.83 61.959 61.746 9.832 13.929 13.877 22.812 22.142 37.846 8.018 14.583 19.603 37.939 19.603 37.939l29.757-25.212s-27.985-44.007-50.52-68.351c-23.314-25.185-44.02-31.989-66.918-57.544-22.479-25.087-25.886-46.663-48.99-71.19-18.804-19.96-47.13-17.502-54.375-45.015-2.123-8.058-2.115-21.88-2.115-21.88L-24.51 65.483zM283.912 300.674s-19.565-29.146-34.906-45.424c-14.675-15.572-26.032-21.012-41.227-36.074-30.489-30.222-41.025-52.993-67.835-86.533-27.137-33.95-38.565-56.6-70.319-86.262-15.843-14.8-25.937-21.735-43.027-35.07-16.577-12.937-43.12-32.242-43.12-32.242l28.457-26.674S61.977-4.31 89.692 27.572c28.673 32.984 36.486 58.092 65.576 90.708 28.557 32.018 53.044 41.65 80.969 74.222 22.726 26.507 20.069 57.691 51.308 73.236 9.149 4.553 24.825 8.262 24.825 8.262l-28.458 26.674zM139.364-30.335s11.192 19.666 21.086 29.78c9.464 9.676 17.912 11.83 27.892 20.992 20.026 18.384 24.849 34.684 41.273 56.47 16.625 22.051 22.205 38.078 43.369 55.761 10.559 8.822 17.712 12.431 29.549 19.827 11.483 7.174 30.109 17.526 30.109 17.526l-28.028 27.128s-33.94-25.084-51.393-45.353c-18.057-20.97-20.234-39.692-38.698-60.282-18.125-20.213-36.698-23.164-54.208-43.949-14.249-16.914-6.751-42.601-29.892-48.994-6.777-1.872-19.086-1.778-19.086-1.778l28.027-27.128z"> </path>
			<ellipse cx="150.203" cy="150.693" fill="url(#radial_gradient_planets)" rx="149.901" ry="150.153"> </ellipse>
		</g>
		<defs>
			<linearGradient id="medium_planet_fill01" x1="0.302" x2="300.607" y1="0.54" y2="300.341" gradientUnits="userSpaceOnUse">
				<stop stopColor="#BB86FC"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<linearGradient id="medium_planet_fill02" x1="0.302" x2="300.607" y1="0.54" y2="300.341" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<RadialGradientPlanets />
		</defs>
	</svg>
}

// SMALL PLANET

function SmallPlanet() {
	return  <svg className={styles.small_planet} viewBox="0 0 201 201">
		<mask id="small_planet_mask" style={{ maskType: "alpha" }} width="201" height="201" x="0" y="0" maskUnits="userSpaceOnUse">
			<ellipse cx="100.703" cy="100.789" fill="url(#small_planet_fill01)" rx="99.934" ry="100.102"> </ellipse>
		</mask>
		<g mask="url(#small_planet_mask)">
			<ellipse cx="100.703" cy="100.789" fill="url(#small_planet_fill02)" rx="99.934" ry="100.102"> </ellipse>
			<path fillOpacity="0.25" d="M-28.442 80.206s7.461 13.111 14.057 19.854c6.31 6.451 11.941 7.886 18.595 13.994 13.35 12.256 16.566 23.123 27.515 37.647 11.083 14.701 14.803 25.385 28.912 37.174 7.04 5.881 11.808 8.287 19.7 13.218 7.655 4.783 20.072 11.684 20.072 11.684l-18.684 18.085s-22.627-16.722-34.263-30.235c-12.038-13.98-13.49-26.461-25.798-40.188C9.58 147.963-2.802 145.996-14.475 132.14c-9.5-11.277-4.5-28.401-19.928-32.663-4.518-1.248-12.724-1.185-12.724-1.185l18.685-18.086zM-15.772 43.983s14.546 11.441 22.05 20.428c7.177 8.596 8.808 15.265 15.61 24.169 13.648 17.865 25.68 24.009 41.816 39.702 16.332 15.884 28.168 22.553 41.306 41.164 6.554 9.286 9.251 15.208 14.761 25.231 5.345 9.722 13.069 25.292 13.069 25.292l19.838-16.808s-18.657-29.338-33.68-45.567c-15.543-16.79-29.347-21.326-44.612-38.363-14.986-16.724-17.257-31.108-32.66-47.46-12.536-13.306-31.42-11.667-36.25-30.01-1.415-5.372-1.41-14.586-1.41-14.586l-19.838 16.808zM189.843 200.777s-13.044-19.43-23.271-30.283c-9.783-10.381-17.354-14.007-27.484-24.049-20.327-20.148-27.351-35.328-45.224-57.689-18.091-22.633-25.71-37.733-46.88-57.508-10.561-9.866-17.29-14.49-28.684-23.38C7.25-.756-10.447-13.626-10.447-13.626L8.525-31.41S41.886-2.545 60.362 18.709C79.478 40.7 84.686 57.437 104.08 79.181c19.038 21.345 35.363 27.767 53.98 49.481 15.15 17.672 13.378 38.461 34.204 48.824 6.1 3.036 16.551 5.508 16.551 5.508l-18.972 17.783zM93.478-19.896s7.461 13.111 14.057 19.854c6.309 6.45 11.941 7.886 18.595 13.994 13.35 12.256 16.566 23.123 27.515 37.647 11.083 14.7 14.803 25.385 28.912 37.174 7.04 5.881 11.808 8.288 19.7 13.218 7.655 4.783 20.072 11.684 20.072 11.684l-18.685 18.085s-22.627-16.722-34.262-30.235c-12.038-13.98-13.489-26.461-25.798-40.188-12.084-13.476-24.466-15.443-36.139-29.3-9.5-11.276-4.501-28.4-19.928-32.662C82.999-1.873 74.793-1.81 74.793-1.81l18.685-18.086z"> </path>
			<ellipse cx="100.703" cy="100.789" fill="url(#radial_gradient_planets)" rx="99.934" ry="100.102"> </ellipse>
		</g>
		<defs>
			<linearGradient id="small_planet_fill01" x1="0.77" x2="200.973" y1="0.688" y2="200.555" gradientUnits="userSpaceOnUse">
				<stop stopColor="#BB86FC"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<linearGradient id="small_planet_fill02" x1="0.77" x2="200.973" y1="0.688" y2="200.555" gradientUnits="userSpaceOnUse">
				<stop stopColor="#DDC3FE"></stop>
				<stop offset="1" stopColor="#7B61FF"></stop>
			</linearGradient>
			<RadialGradientPlanets />
		</defs>
	</svg>
}

// GREEN MICRO PLANETS

function GreenMicroPlanet01() {
	return  <svg className={styles.green_micro_planet01} viewBox="0 0 41 41">
		<path fill="url(#red_micro_planet_fill)" d="M40.085 20.413c0 11.057-8.948 20.02-19.987 20.02C9.06 40.433.111 31.47.111 20.413S9.06.393 20.098.393c11.039 0 19.987 8.963 19.987 20.02z"> </path>
		<defs>
			<linearGradient id="red_micro_planet_fill" x1="73.563" x2="113.603" y1="20.413" y2="60.386" gradientUnits="userSpaceOnUse">
				<stop stopColor="#A4EDE1"></stop>
				<stop offset="1" stopColor="#48DAC3"></stop>
			</linearGradient>
		</defs>
  	</svg>
}

function GreenMicroPlanet02() {
	return  <svg className={styles.green_micro_planet02} viewBox="0 0 41 41">
		<path fill="url(#red_micro_planet_fill)" d="M40.085 20.413c0 11.057-8.948 20.02-19.987 20.02C9.06 40.433.111 31.47.111 20.413S9.06.393 20.098.393c11.039 0 19.987 8.963 19.987 20.02z"> </path>
		<defs>
			<linearGradient id="red_micro_planet_fill" x1="73.563" x2="113.603" y1="20.413" y2="60.386" gradientUnits="userSpaceOnUse">
				<stop stopColor="#A4EDE1"></stop>
				<stop offset="1" stopColor="#48DAC3"></stop>
			</linearGradient>
		</defs>
  	</svg>
}

function GreenMicroPlanet03() {
	return  <svg className={styles.green_micro_planet03} viewBox="0 0 41 41">
		<path fill="url(#red_micro_planet_fill)" d="M40.085 20.413c0 11.057-8.948 20.02-19.987 20.02C9.06 40.433.111 31.47.111 20.413S9.06.393 20.098.393c11.039 0 19.987 8.963 19.987 20.02z"> </path>
		<defs>
			<linearGradient id="red_micro_planet_fill" x1="73.563" x2="113.603" y1="20.413" y2="60.386" gradientUnits="userSpaceOnUse">
				<stop stopColor="#A4EDE1"></stop>
				<stop offset="1" stopColor="#48DAC3"></stop>
			</linearGradient>
		</defs>
  	</svg>
}

function GreenMicroPlanet04() {
	return  <svg className={styles.green_micro_planet04} viewBox="0 0 41 41">
		<path fill="url(#red_micro_planet_fill)" d="M40.085 20.413c0 11.057-8.948 20.02-19.987 20.02C9.06 40.433.111 31.47.111 20.413S9.06.393 20.098.393c11.039 0 19.987 8.963 19.987 20.02z"> </path>
		<defs>
			<linearGradient id="red_micro_planet_fill" x1="73.563" x2="113.603" y1="20.413" y2="60.386" gradientUnits="userSpaceOnUse">
				<stop stopColor="#A4EDE1"></stop>
				<stop offset="1" stopColor="#48DAC3"></stop>
			</linearGradient>
		</defs>
  	</svg>
}

// RED MICRO PLANETS

function RedMicroPlanet01() {
	return <svg className={styles.red_micro_planet01} viewBox="0 0 61 61">
		<ellipse cx="30.143" cy="30.153" fill="url(#paint0_linear_413_3163)" rx="29.98" ry="30.03"> </ellipse>
		<defs>
			<linearGradient id="paint0_linear_413_3163" x1="0.163" x2="60.224" y1="0.122" y2="60.083" gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFB3B3"></stop>
				<stop offset="1" stopColor="#FF6667"></stop>
			</linearGradient>
		</defs>
    </svg>
}

function RedMicroPlanet02() {
	return <svg className={styles.red_micro_planet02} viewBox="0 0 61 61">
		<ellipse cx="30.143" cy="30.153" fill="url(#paint0_linear_413_3163)" rx="29.98" ry="30.03"> </ellipse>
		<defs>
			<linearGradient id="paint0_linear_413_3163" x1="0.163" x2="60.224" y1="0.122" y2="60.083" gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFB3B3"></stop>
				<stop offset="1" stopColor="#FF6667"></stop>
			</linearGradient>
		</defs>
    </svg>
}

function RedMicroPlanet03() {
	return <svg className={styles.red_micro_planet03} viewBox="0 0 61 61">
		<ellipse cx="30.143" cy="30.153" fill="url(#paint0_linear_413_3163)" rx="29.98" ry="30.03"> </ellipse>
		<defs>
			<linearGradient id="paint0_linear_413_3163" x1="0.163" x2="60.224" y1="0.122" y2="60.083" gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFB3B3"></stop>
				<stop offset="1" stopColor="#FF6667"></stop>
			</linearGradient>
		</defs>
    </svg>
}

function RedMicroPlanet04() {
	return <svg className={styles.red_micro_planet04} viewBox="0 0 61 61">
		<ellipse cx="30.143" cy="30.153" fill="url(#paint0_linear_413_3163)" rx="29.98" ry="30.03"> </ellipse>
		<defs>
			<linearGradient id="paint0_linear_413_3163" x1="0.163" x2="60.224" y1="0.122" y2="60.083" gradientUnits="userSpaceOnUse">
				<stop stopColor="#FFB3B3"></stop>
				<stop offset="1" stopColor="#FF6667"></stop>
			</linearGradient>
		</defs>
    </svg>
}

// BLUE MICRO PLANETS

function BlueMicroPlanet01() {
	return <svg className={styles.blue_micro_planet01} viewBox="0 0 41 41">
		<ellipse cx="20.55" cy="20.732" fill="url(#blue_micro_planet_fill)" rx="19.987" ry="20.02"> </ellipse>
		<defs>
			<linearGradient id="blue_micro_planet_fill" x1="0.563" x2="40.604" y1="0.712" y2="40.685" gradientUnits="userSpaceOnUse">
				<stop stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
	</svg>
}

function BlueMicroPlanet02() {
	return <svg className={styles.blue_micro_planet02} viewBox="0 0 41 41">
		<ellipse cx="20.55" cy="20.732" fill="url(#blue_micro_planet_fill)" rx="19.987" ry="20.02"> </ellipse>
		<defs>
			<linearGradient id="blue_micro_planet_fill" x1="0.563" x2="40.604" y1="0.712" y2="40.685" gradientUnits="userSpaceOnUse">
				<stop stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
	</svg>
}

function BlueMicroPlanet03() {
	return <svg className={styles.blue_micro_planet03} viewBox="0 0 41 41">
		<ellipse cx="20.55" cy="20.732" fill="url(#blue_micro_planet_fill)" rx="19.987" ry="20.02"> </ellipse>
		<defs>
			<linearGradient id="blue_micro_planet_fill" x1="0.563" x2="40.604" y1="0.712" y2="40.685" gradientUnits="userSpaceOnUse">
				<stop stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
	</svg>
}

function BlueMicroPlanet04() {
	return <svg className={styles.blue_micro_planet04} viewBox="0 0 41 41">
		<ellipse cx="20.55" cy="20.732" fill="url(#blue_micro_planet_fill)" rx="19.987" ry="20.02"> </ellipse>
		<defs>
			<linearGradient id="blue_micro_planet_fill" x1="0.563" x2="40.604" y1="0.712" y2="40.685" gradientUnits="userSpaceOnUse">
				<stop stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
	</svg>
}

// PLANETS

function Planets() {
	return <div>
		<BigPlanet />
		<MediumPlanet />
		<SmallPlanet />
		<GreenMicroPlanet01 />
		<GreenMicroPlanet02 />
		<GreenMicroPlanet03 />
		<GreenMicroPlanet04 />
		<RedMicroPlanet01 />
		<RedMicroPlanet02 />
		<RedMicroPlanet03 />
		<RedMicroPlanet04 />
		<BlueMicroPlanet01 />
		<BlueMicroPlanet02 />
		<BlueMicroPlanet03 />
		<BlueMicroPlanet04 />
	</div>
}

export default Planets;
