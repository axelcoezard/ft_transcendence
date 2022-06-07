import styles from "../styles/components/Loading.module.scss"
import LoadingSpin from "react-loading-spin";
import React, { useState } from "react";

const Loading = (props: any) => {
	const {title, subtitle} = props;

	return <div className={styles.loading}>
		<div className={styles.loading_container}>
			<LoadingSpin
				width="8px"
				size="100px"
				primaryColor="#BB86FC"
				secondaryColor="#ffffff"
				numberOfRotationsInAnimation={2}
			/>
			<h2 className={styles.loading_h2}>{title}</h2>
			<p className={styles.loading_text}>{subtitle}</p>
		</div>
	</div>
}

export default Loading;
