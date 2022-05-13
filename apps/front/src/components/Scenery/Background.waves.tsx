import path from "path/posix";
import * as React from "react";

import styles from '../../styles/Illustration.module.scss'

const BackgroundWave01 = () => {
	return <svg className = {styles.background_wave01} width = "590" height = "301" fill = "none" viewBox = "0 0 590 301">
      <path d = "M0 200.767V0h590s-64.285 54.634-115.912 125.097c-68.524 93.523-135.69 234.884-284.563 149.591C40.652 189.395 0 200.767 0 200.767z"> </path>
    </svg>
}

const BackgroundWave02 = () => {
	return <svg className = {styles.background_wave02} width = "537" height = "345" fill = "none" viewBox = "0 0 537 345">
		<path d = "M0 229.5V0h537s-58.511 62.453-105.5 143c-62.368 106.908-123.5 268.5-259 171S0 229.5 0 229.5z"> </path>
	</svg>
}

const BackgroundWave03 = () => {
	return <svg className = {styles.background_wave03} width = "374" height = "538" fill = "none" viewBox = "0 0 374 538">
	<path d = "M247.406 29.279C147.403-81.291 0 156.933 0 156.933V538h374s-115.682-85.419-142.779-206.431c-28.903-129.078 116.189-191.72 16.185-302.29z"> </path>
  </svg>
}

const BackgroundWave04 = () => {
	return  <svg className = {styles.background_wave04} width = "324" height = "567" fill = "none" viewBox = "0 0 324 567" >
	<path d = "M214 30.849C127.5-85.651 0 165.348 0 165.348v401.501h323.5S223.438 476.85 200 349.349c-25-135.999 100.5-202.001 14-318.5z"> </path>
  </svg>
}

const BackgroundWave05 = (props: any) => {
	return <svg className = {styles.background_wave05} width = "1080" height = "980-10" fill = "none" viewBox = "0 0 1080 980">
      <path d=  "M951.169 835.745C909.286 861.881 929.745 980 929.745 980H81.461S-59.17 578.699 29.12 416.038c86.105-158.64 374.599-89.151 432.573-196.227C508.236 133.848 432.954 0 432.954 0h216.039s103.89 155.109 54.505 239.623c-85.722 146.698-277.457 79.094-330.995 221.698-72.761 193.804 184.114 463.407 289.373 448.113 94.145-13.679-30.504-209.928 55.992-271.698C826.383 560.241 1080 782.443 1080 782.443v96.698s-84.197-71.248-128.831-43.396z"> </path>
    </svg>
}

const BackgroundWave06 = () => {
	return  <svg className = {styles.background_wave06} width = "1041" height = "981-10" fill = "none" viewBox = "0 0 1041 981" >
		<path d="M911.43 852.5c-42.264 27.704-19 128-19 128H81.93S-59.66 613.421 29.43 441c86.887-168.158 378-94.5 436.5-208 46.965-91.121-29-233-29-233h218s104.833 164.415 55 254c-86.5 155.5-279.704 85.042-334 235-74.131 204.739 185.786 491.212 292 475 95-14.5-30.781-222.524 56.5-288 109.5-82.145 317 120 317 120v102.5s-84.962-75.523-130-46z"> </path>
	</svg>
}

const BackgroundWaves = (props : any) => {
	return <div>
		<BackgroundWave01 />
		<BackgroundWave02 />
		<BackgroundWave03 />
		<BackgroundWave04 />
		<BackgroundWave05 />
		<BackgroundWave06 />
	</div>
}

export default BackgroundWaves;