import styles from "../../styles/Svg.module.scss"
import LoadingSpin from "react-loading-spin";
import React, { useState } from "react";

const LoadingRandom = () => {
	return  <div className={styles.loading}>
		 <LoadingSpin
            width="0.78125vw"
            size="7.8125vw"
            primaryColor="#BB86FC"
            secondaryColor="#ffffff"
            numberOfRotationsInAnimation={2}
        />
		<h2 className={styles.loading_h2}>Matching...</h2>
		<p className={styles.loading_text}>Please be patient.</p>
	</div>
}

const LoadingInvite = () => {
	return  <div className={styles.loading}>
		 <LoadingSpin
            width="0.78125vw"
            size="7.8125vw"
            primaryColor="#BB86FC"
            secondaryColor="#ffffff"
            numberOfRotationsInAnimation={2}
        />
		<h2 className={styles.loading_h2}>Invitation sent!</h2>
		<p className={styles.loading_text}>Waiting for a response...</p>
	</div>
}

const LoadingView = () => {
	return  <div className={styles.loading}>
		 <LoadingSpin
            width="0.78125vw"
            size="7.8125vw"
            primaryColor="#BB86FC"
            secondaryColor="#ffffff"
            numberOfRotationsInAnimation={2}
        />
		<h2 className={styles.loading_h2}>Preparing viewing...</h2>
		<p className={styles.loading_text}>Please be patient.</p>
	</div>
}

const ExportLoading = {
	LoadingRandom,
	LoadingInvite,
	LoadingView
}

export default ExportLoading;
