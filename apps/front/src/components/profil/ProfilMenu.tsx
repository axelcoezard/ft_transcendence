import styles from "../../styles/pages/Profil.module.scss";

const ProfilMenu = (props: any) => {
	const {onglet, setOnglet} = props;

	return <nav className={styles.profil_menu}>
		<button className={onglet ==="history" ? styles.profil_menu_active : ""} onClick={(e) => {setOnglet("history")}}>Historique</button>
		<button className={onglet ==="friends" ? styles.profil_menu_active : ""} onClick={(e) => {setOnglet("friends")}}>Amis</button>
		<button className={onglet ==="blockeds" ? styles.profil_menu_active : ""} onClick={(e) => {setOnglet("blockeds")}}>Bloqués</button>
	</nav>
}

export default ProfilMenu;
