import styles from "../../styles/Svg.module.scss"
import LoadingSpin from "react-loading-spin";
import React, { useState } from "react";

const Loading = (props: any) => {
	const {title, subtitle} = props;

	return  <div className={styles.loading}>
		 <LoadingSpin
            width="0.78125vw"
            size="7.8125vw"
            primaryColor="#BB86FC"
            secondaryColor="#ffffff"
            numberOfRotationsInAnimation={2}
        />
		<h2 className={styles.loading_h2}>{title}</h2>
		<p className={styles.loading_text}>{subtitle}</p>
	</div>
}

export default Loading;
