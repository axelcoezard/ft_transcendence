import React, { useState } from "react";

import styles from '../../styles/Illustration.module.scss'

const TopFrameWaves = (props : any) => {
	return <svg className={styles.top_frame_waves} width="750" height="485" viewBox="0 0 750 485" >
		<defs>
			<linearGradient id="gradient_top_frame_waves" x1="100.983" x2="751.857" y1="506.442" y2="-0.184">
			<stop stopColor="#B0DAF3"></stop>
			<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
		<path d="M750.556 0L752 485c-107.062-61.915-91.089-264.019-213.5-328.5-141.527-74.55-307.758 48.972-439-42C36.309 70.698 0 0 0 0h750.556z"> </path>
	</svg>
}

const BottomFrameWaves = (props : any) => {
	return <svg className={styles.bottom_frame_waves} width="914" height="551" viewBox="0 0 914 551">		
		<defs>
			<linearGradient id="gradient_bottom_frame_waves" x1="-21.276" x2="878.724" y1="551.218" y2="28.218">
				<stop stopColor="#60B5E7"></stop>
				<stop offset="1" stopColor="#B0DAF3"></stop>
			</linearGradient>
		</defs>
		<path d="M-19.275 551.218V5.442c-3.881-8.876 0-4.223 0-4.223v4.223c6.405 14.651 33.955 66.159 134.999 236.276 162.263 273.186 500.531-5.562 699.501 150 81.326 63.584 98 159.5 98 159.5h-932.5z"> </path>
	</svg>
}

const FrameWaves = () => {
	return <div>
		<BottomFrameWaves />
		<TopFrameWaves />
	</div>
}

export default FrameWaves;