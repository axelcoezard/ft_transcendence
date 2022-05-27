import React, { useState } from "react";
import styles from "../styles/Matching.module.scss"
import Loading from "../components/SVGs/Loading"

const Matching = (props: any) => {
	return <main className={styles.matching}>
		<section><Loading/></section>
	</main>
}

export default Matching;