import styles from '../styles/Profil.module.scss'
import ProfilHeader from '../components/profil/ProfilHeader';
import ProfilHistory from '../components/profil/ProfilHistory';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSession from '../hooks/useSession';

const Profil = () => {
	const session = useSession("session");
	const [user, setUser] = useState<any>({});
	const { id } = useParams();

	let fetchSession = () => setUser(session.value)
	let fetchUser = async () => {
		let res = await fetch(`http://localhost:3030/users/${id}`);
		if (!res.ok) return false;
		let data = await res.json();
		setUser(data)
	}

	useEffect(() => {
		if (!id) return fetchSession()
		console.log("fetchUser")
		fetchUser()
	}, [id])
	useEffect(() => console.log("changed user"), [user]);

	return <main className={styles.profil}>
		<ProfilHeader user={user} />
		<ProfilHistory user={user} />
	</main>
}

export default Profil;
