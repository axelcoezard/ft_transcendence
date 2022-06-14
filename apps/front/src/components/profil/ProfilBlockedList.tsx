import styles from '../../styles/pages/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import { useEffect, useState } from 'react';
import useSession from '../../hooks/useSession';
import ProfilBlockedButton from './ProfilBlockButton';

const ProfilBlocked = ({user}: {user: any}) => {

	return <div className={styles.profil_match}>
		<Avatar user={user.id} width="60px" height="60px" />
	</div>
}

const ProfilBlockedList = (props: any) => {
	const {user} = props;
	const [blockeds, setBlockeds] = useState([]);
	const session = useSession("session");

	const fechHistory = async () => {
		if (!user.id) return;
		let res = await fetch(`http://localhost:3030/users/${user.id}/blockeds`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		})
		let data = await res.json();
		if (data.error) return;
		setBlockeds(data);
	}

	useEffect(() => {
		fechHistory();
	}, [user])

	return <div className={styles.profil_history}>
		{blockeds && blockeds.length > 0 ? blockeds.map((u: any, index: number) => {
			return <ProfilBlocked key={index} user={u} />
		}) : <p>Aucun utilisateur bloqué.</p>}
	</div>
}

export default ProfilBlockedList;
