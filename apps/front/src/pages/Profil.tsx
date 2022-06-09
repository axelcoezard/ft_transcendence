import styles from '../styles/pages/Profil.module.scss'
import ProfilHeader from '../components/profil/ProfilHeader';
import ProfilHistory from '../components/profil/ProfilHistory';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSession from '../hooks/useSession';
import ProfilBlockedList from '../components/profil/ProfilBlockedList';
import ProfilFriendList from '../components/profil/ProfilFriendList';
import ProfilMenu from '../components/profil/ProfilMenu';

const Profil = () => {
	const [onglet, setOnglet] = useState("friends");
	const session = useSession("session");
	const [user, setUser] = useState<any>({});
	const { id } = useParams();

	let fetchSession = () => setUser(session.value)
	let fetchUser = async () => {
		let res = await fetch(`http://c2r2p3.42nice.fr:3030/users/${id}`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) return false;
		let data = await res.json();
		setUser(data)
	}

	useEffect(() => {
		if (!id) return fetchSession()
		fetchUser()
	}, [id])

	return <main className={styles.profil}>
		<ProfilHeader user={user} />
		<ProfilMenu onglet={onglet} setOnglet={setOnglet} />
		{onglet === "history" && <ProfilHistory user={user} />}
		{onglet === "friends" && <ProfilFriendList user={user} />}
		{onglet === "blockeds" && <ProfilBlockedList user={user} />}
	</main>
}

export default Profil;
