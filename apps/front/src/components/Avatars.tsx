import * as React from "react";

const FilterAvatars = () => {
	return <defs>
		<filter id="filter_avatar_torso" width="62.455" height="37.421" x="8.388" y="50.632" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
			<feOffset dx="2" dy="2"></feOffset>
			<feGaussianBlur stdDeviation="1"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" ></feComposite>
			<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_142_443"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
			<feOffset dx="-1" dy="-1"></feOffset>
			<feGaussianBlur stdDeviation="2"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="effect1_innerShadow_142_443" result="effect2_innerShadow_142_443"></feBlend>
		</filter>
		<filter id="filter_avatar_head" width="31.163" height="31.163" x="24.034" y="18.166" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
			<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
			<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
			<feOffset dx="2" dy="2"></feOffset>
			<feGaussianBlur stdDeviation="1"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
			<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
			<feBlend in2="shape" result="effect1_innerShadow_142_443"></feBlend>
			<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
			<feOffset dx="-1" dy="-1"></feOffset>
			<feGaussianBlur stdDeviation="2"></feGaussianBlur>
			<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
			<feBlend in2="effect1_innerShadow_142_443" result="effect2_innerShadow_142_443"></feBlend>
		</filter>
	</defs>
}

const PurpleAvatar = (props : any) => {
	const {width, height} = props
	
	return  <svg width={props.width} height={props.height} fill="none" viewBox="0 0 79 79">
		<circle cx="39.115" cy="39.115" r="39.115" fill="#BB86FC"></circle>
		<circle cx="39.115" cy="39.115" r="38.115" stroke="#fff" strokeOpacity="0.9" strokeWidth="2"></circle>
		<mask id="mask0_142_443" style={{ maskType: "alpha" }} width="79" height="79" x="0" y="0" maskUnits="userSpaceOnUse">
			<circle cx="39.115" cy="39.115" r="39.115" fill="#C4C4C4"></circle>
		</mask>
		<g filter="url(#filter_avatar_torso)" mask="url(#mask0_142_443)">
			<ellipse cx="39.115" cy="68.842" fill="#fff" fillOpacity="0.9" rx="29.727" ry="17.211"></ellipse>
		</g>
		<g filter="url(#filter_avatar_head)">
			<circle cx="39.115" cy="33.248" r="14.081" fill="#fff" fillOpacity="0.9"></circle>
		</g>
		< FilterAvatars />
	</svg>
}

const BlueAvatar = (props : any) => {
	const {width, height} = props

	return  <svg width={props.width} height={props.height} fill="none" viewBox="0 0 79 79">
		<circle cx="39.115" cy="39.115" r="39.115" fill="#60B5E7"></circle>
		<circle cx="39.115" cy="39.115" r="38.115" stroke="#fff" strokeOpacity="0.9" strokeWidth="2"></circle>
		<mask id="mask0_142_443" style={{ maskType: "alpha" }} width="79" height="79" x="0" y="0" maskUnits="userSpaceOnUse">
			<circle cx="39.115" cy="39.115" r="39.115" fill="#C4C4C4"></circle>
		</mask>
		<g filter="url(#filter_avatar_torso)" mask="url(#mask0_142_443)">
			<ellipse cx="39.115" cy="68.842" fill="#fff" fillOpacity="0.9" rx="29.727" ry="17.211"></ellipse>
		</g>
		<g filter="url(#filter_avatar_head)">
			<circle cx="39.115" cy="33.248" r="14.081" fill="#fff" fillOpacity="0.9"></circle>
		</g>
		< FilterAvatars />
	</svg>
}

const GreenAvatar = (props : any) => {
	const {width, height} = props
	
	return  <svg width={props.width} height={props.height} fill="none" viewBox="0 0 79 79">
		<circle cx="39.115" cy="39.115" r="39.115" fill="#48DAC3"></circle>
		<circle cx="39.115" cy="39.115" r="38.115" stroke="#fff" strokeOpacity="0.9" strokeWidth="2"></circle>
		<mask id="mask0_142_443" style={{ maskType: "alpha" }} width="79" height="79" x="0" y="0" maskUnits="userSpaceOnUse">
			<circle cx="39.115" cy="39.115" r="39.115" fill="#C4C4C4"></circle>
		</mask>
		<g filter="url(#filter_avatar_torso)" mask="url(#mask0_142_443)">
			<ellipse cx="39.115" cy="68.842" fill="#fff" fillOpacity="0.9" rx="29.727" ry="17.211"></ellipse>
		</g>
		<g filter="url(#filter_avatar_head)">
			<circle cx="39.115" cy="33.248" r="14.081" fill="#fff" fillOpacity="0.9"></circle>
		</g>
		< FilterAvatars />
	</svg>
}

const ImageAvatar = (props : any) => {
	const {width, height} = props

	return  <svg width={props.width} height={props.height} fill="none" viewBox="0 0 79 79">
		<circle cx="39.115" cy="39.805" r="39.115" fill="url(#pattern0)"></circle>
		<circle cx="39.115" cy="39.805" r="38.115" stroke="#fff" strokeOpacity="0.9" strokeWidth="2"></circle>
		<defs>
			<pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
				<use transform="translate(0 -.25) scale(.0025)" xlinkHref="#image0_142_557"></use>
			</pattern>
			<image id="image0_142_557" width="400" height="600" xlinkHref=""></image>
		</defs>
	</svg>
}

const UploadAvatar = (props : any) => {
	const {width, height} = props

	return  <svg width={props.width} height={props.height} fill="none" viewBox="0 0 79 79">
		<circle cx="39.115" cy="40.035" r="39.115" fill="#323232"></circle>
		<circle cx="39.115" cy="40.035" r="38.115" stroke="#fff" strokeOpacity="0.9" strokeWidth="2"></circle>
		<mask id="mask0_739_2093" style={{ maskType: "alpha" }} width="79" height="80" x="0" y="0" maskUnits="userSpaceOnUse">
			<circle cx="39.115" cy="40.035" r="39.115" fill="#C4C4C4"></circle>
		</mask>
		<g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" mask="url(#mask0_739_2093)">
			<path d="M51.5 52.5h-25A2.5 2.5 0 0124 50V32.5a2.5 2.5 0 012.5-2.5h5l2.5-3.75h10L46.5 30h5a2.5 2.5 0 012.5 2.5V50a2.5 2.5 0 01-2.5 2.5z"></path>
			<path d="M39 46.25A5.625 5.625 0 1039 35a5.625 5.625 0 000 11.25z"></path>
		</g>
	</svg>
}


export default { PurpleAvatar, BlueAvatar, GreenAvatar, ImageAvatar, UploadAvatar };