import styles from '../../styles/pages/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import useSession from '../../hooks/useSession';
import { useEffect, useState } from 'react';

const ProfilFriendButton = (props: any) => {
	const {user} = props;
	const [friends, setFriends] = useState<any[]>([])
	const session = useSession("session");

	const fetchFriends = async () => {
		let res = await fetch(`http://localhost:3030/users/${session.get("id")}/friends`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		let data = await res.json();
		if (data.error) return;
		setFriends(data);
	}

	const handleFriend = async (e: any, type: string) => {
		e.preventDefault()
		let res = await fetch(`http://localhost:3030/users/${session.get("id")}/friends`, {
			method: type,
			headers: {
				"Authorization": `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ friend_id: user.id })
		});
		let data = await res.json();
		if (data.error) return
		fetchFriends();
	}

	useEffect(() => {
		if (!user.id) return;
		fetchFriends();
	}, [user.id])

	return <> {friends && friends.filter((u: any) => u.id === user.id).length === 0
		? <button
			className={styles.profil_header_action}
			onClick={(e) => handleFriend(e, "POST")}>
			Ajouter en ami
		</button>
		: <button
			className={styles.profil_header_action}
			onClick={(e) => handleFriend(e, "DELETE")}>
			Supprimer des amis
		</button>
	}</>

}

export default ProfilFriendButton;
