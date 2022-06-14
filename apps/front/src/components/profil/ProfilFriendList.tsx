import styles from '../../styles/pages/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import { useEffect, useState } from 'react';
import useSession from '../../hooks/useSession';
import ProfilFriendButton from './ProfilBlockButton';

const ProfilFriend = ({user}: {user: any}) => {

	return <div className={styles.profil_match}>
		<Avatar user={user.id} width="60px" height="60px" />
	</div>
}

const ProfilFriendList = (props: any) => {
	const {user} = props;
	const [friends, setFriends] = useState([]);
	const session = useSession("session");

	const fechHistory = async () => {
		if (!user.id) return;
		let res = await fetch(`http://localhost:3030/users/${user.id}/friends`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`
			},
		})
		let data = await res.json();
		if (data.error) return;
		setFriends(data);
	}

	useEffect(() => {
		fechHistory();
	}, [user])

	return <div className={styles.profil_history}>
		{friends && friends.length > 0 ? friends.map((u: any, index: number) => {
			return <ProfilFriend key={index} user={u} />
		}) : <p>Aucun ami ajouté.</p>}
	</div>
}

export default ProfilFriendList;
