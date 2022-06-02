import styles from '../../styles/components/Scenery.module.scss'

function TopFrameWave() {
	return     <svg className={styles.top_frame_wave} viewBox="0 0 752 486">
		<g filter="url(#top_frame_wave_filter)">
			<path fill="url(#top_frame_wave_linear_gradient)" d="M750.059 0l1.443 485.494c-106.991-61.977-91.029-264.288-213.358-328.834-141.434-74.627-307.555 49.021-438.71-42.043C36.284 70.771 0 0 0 0h750.059z" > </path>
		</g>
		<defs>
			<filter id="top_frame_wave_filter" width="756.502" height="490.494" x="-5" y="-5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
				<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"> </feBlend>
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"> </feColorMatrix>
				<feOffset dx="-5" dy="-5"></feOffset>
				<feGaussianBlur stdDeviation="25"></feGaussianBlur>
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"> </feComposite>
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
				<feBlend in2="shape" result="effect1_innerShadow_413_3211"></feBlend>
			</filter>
			<linearGradient id="top_frame_wave_linear_gradient" x1="100.916" x2="752.183" y1="506.958" y2="0.876" gradientUnits="userSpaceOnUse">
				<stop stopColor="#B0DAF3"></stop>
				<stop offset="1" stopColor="#60B5E7"></stop>
			</linearGradient>
		</defs>
	</svg>
}

function BottomFrameWave() {
	return  <svg className={styles.bottom_frame_wave} viewBox="0 0 913 552">
		<path fill="url(#bottom_frame_wave_linear_gradient)" d="M-19.263 552.219V5.887c-3.878-8.885 0-4.228 0-4.228v4.228c6.401 14.666 33.933 66.226 134.91 236.517 162.156 273.463 500.201-5.568 699.039 150.153 81.272 63.648 97.935 159.662 97.935 159.662H-19.263z"> </path>
		<defs>
			<linearGradient id="bottom_frame_wave_linear_gradient" x1="-21.262" x2="878.905" y1="552.219" y2="30" gradientUnits="userSpaceOnUse">
				<stop stopColor="#60B5E7"></stop>
				<stop offset="1" stopColor="#B0DAF3"></stop>
			</linearGradient>
		</defs>
	</svg>
}

function FrameWaves() {
	return <div className={styles.frame_waves}>
		<TopFrameWave />
		<BottomFrameWave />
	</div>
}

export default FrameWaves;
