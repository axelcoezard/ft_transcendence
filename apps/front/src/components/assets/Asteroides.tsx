import * as React from "react";

import styles from '../../styles/Scenery.module.scss'

function Asteroide01() {
	return <svg className={styles.asteroide01}>
		<path  d="M16.593.624c9.742-1.128 20.215 1.778 26.852 9.545 6.46 7.56 7.182 18.734 6.03 28.935-1.01 8.948-5.56 16.725-11.856 22.658-5.843 5.506-13.359 7.018-21.026 8.326-9.902 1.688-20.924 6.695-28.931.193-8.403-6.824-10.722-19.954-9.22-31.177 1.346-10.06 9.625-16.373 16.512-23.319C1.484 9.2 7.7 1.655 16.594.625z"> </path>
	</svg>
}

function Asteroide02() {
	return <svg className={styles.asteroide02}>
		<path  d="M57.44.6C71.78-1.104 87.2 3.28 96.97 14.993c9.511 11.401 10.574 28.255 8.878 43.64-1.487 13.495-8.184 25.224-17.454 34.173-8.603 8.304-19.668 10.585-30.955 12.556-14.578 2.547-30.806 10.099-42.593.292C2.474 95.363-.94 75.561 1.27 58.635c1.982-15.174 14.171-24.695 24.31-35.17C35.195 13.53 44.347 2.153 57.439.599z"> </path>
	</svg>
}

function Asteroide03() {
	return <svg className={styles.asteroide03}>
		<path  d="M47.724.025C61.75-.553 73.51 9.118 82.6 19.99c9.549 11.422 19.733 25.624 15.145 39.868-4.391 13.635-21.943 14.583-34.677 20.777-12.665 6.16-24.159 18.848-37.474 14.321C11.188 90.058 2.218 74.576.23 59.271c-1.805-13.906 7.27-25.674 15.987-36.549C24.772 12.051 34.191.582 47.724.025z"> </path>
	</svg>
}

function Asteroide04() {
	return <svg className={styles.asteroide04}>
		<path d="M47.724.025C61.75-.553 73.51 9.118 82.6 19.99c9.549 11.422 19.733 25.624 15.145 39.868-4.391 13.635-21.943 14.583-34.677 20.777-12.665 6.16-24.159 18.848-37.474 14.321C11.188 90.058 2.218 74.576.23 59.271c-1.805-13.906 7.27-25.674 15.987-36.549C24.772 12.051 34.191.582 47.724.025z"> </path>
	</svg>
}

function Asteroide05() {
	return <svg className={styles.asteroide05}>
		<path d="M.796 41.019c.753-12.39 7.692-21.96 15.166-29.082 7.852-7.482 17.481-15.3 25.966-10.115 8.122 4.964 7.32 20.486 10.16 32.19 2.823 11.642 9.794 22.779 5.926 34.131-4.184 12.282-14.512 18.928-24.176 19.443-8.782.468-15.373-8.466-21.438-17.014C6.449 62.185.07 52.972.796 41.02z"> </path>
	</svg>
}

function Asteroide06() {
	return <svg className={styles.asteroide06}>
		<path  d="M57.44.6C71.78-1.104 87.2 3.28 96.97 14.993c9.511 11.401 10.574 28.255 8.878 43.64-1.487 13.495-8.184 25.224-17.454 34.173-8.603 8.304-19.668 10.585-30.955 12.556-14.578 2.547-30.806 10.099-42.593.292C2.474 95.363-.94 75.561 1.27 58.635c1.982-15.174 14.171-24.695 24.31-35.17C35.195 13.53 44.347 2.153 57.439.599z"> </path>
	</svg>
}


function Asteroides(props: any) {
	return <div className={styles.asteroides}>
		<Asteroide01 />
		<Asteroide02 />
		<Asteroide03 />
		<Asteroide04 />
		<Asteroide05 />
		<Asteroide06 />
	</div>
}

export default Asteroides;