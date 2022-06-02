import styles from "../styles/Components.module.scss"
import Confetties from 'react-confetti'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ResultsButtonAgain = (props: any) => {
	const { url } = props;

	return <div className={styles.results_buttons}>

		<Link className={styles.results_button} to={"/home"}>
			<h1 className={styles.results_text}>EXIT</h1>
		</Link>
	</div>
}

const ResultsMessage = (props: any) => {
	const { victory } = props;

	return <div>
		{victory && <Confetties
			className={styles.results_confetties}
			colors={["#48DAC3", "#60B5E7", "#BB86FC", "#FF6667", "#A4EDE1", "#B0DAF3", "#DDC3FE", "#FFB3B3"]}
		/>}
		<h1 className={styles.results_h1}>{victory ? "VICTOIRE" : "DEFAITE"}</h1>
	</div>
}

const Results = (props: any) => {
	const { victory, url } = props;

	return <section className={styles.results}>
		<ResultsMessage victory={props.victory} />
		<ResultsButtonAgain url={props.url} />
	</section>
}

export default Results;
