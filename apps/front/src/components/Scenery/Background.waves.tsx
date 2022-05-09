import React from "react";

import styles from '../../styles/Illustration.module.scss'

function Wave01() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="590"
      height="301"
      fill="none"
      viewBox="0 0 590 301"
    >
      <path className={styles.waves}
        fill="#243B6D"
        fillOpacity="0.25"
        d="M0 200.767V0h590s-64.285 54.634-115.912 125.097c-68.524 93.523-135.69 234.884-284.563 149.591C40.652 189.395 0 200.767 0 200.767z"
      ></path>
    </svg>
  );
}



export default Wave01;