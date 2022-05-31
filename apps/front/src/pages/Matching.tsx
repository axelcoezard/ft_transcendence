import React, { useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/SVGs/Loading"

const Matching = (props: any) => {
	const { type } = props;
	
	if (props.type === "random") {
		return <div className={styles.matching}>
		<	Loading.LoadingRandom />
		</div>
	}
	else if (props.type === "invite") {
		return <div className={styles.matching}>
			<Loading.LoadingInvite />
		</div>
	}
	return <div className={styles.matching}>
		<Loading.LoadingView />
	</div>
}

export default Matching;