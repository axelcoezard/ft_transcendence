import styles from '../../styles/pages/Profil.module.scss'
import Ranked from '../Ranked'
import Avatar from '../Avatar';
import useSession from '../../hooks/useSession';
import { useEffect, useState } from 'react';

const ProfilBlockedButton = (props: any) => {
	const {user} = props;
	const [blockeds, setBlockeds] = useState<any[]>([])
	const session = useSession("session");

	const fetchBlockeds = async () => {
		let res = await fetch(`http://localhost:3030/users/${session.get("id")}/blockeds`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
		});
		let data = await res.json();
		if (data.error) return;
		setBlockeds(data);
	}

	const handleBlocked = async (e: any, type: string) => {
		e.preventDefault()
		let res = await fetch(`http://localhost:3030/users/${session.get("id")}/blockeds`, {
			method: type,
			headers: {
				"Authorization": `Bearer ${session.get("request_token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ blocked_id: user.id })
		});
		let data = await res.json();
		if (data.error) return
		fetchBlockeds();
	}

	useEffect(() => {
		if (!user.id) return;
		fetchBlockeds();
	}, [user.id])

	return <> {blockeds && blockeds.filter((u: any) => u.id === user.id).length === 0
		? <button
			className={styles.profil_header_action}
			onClick={(e) => handleBlocked(e, "POST")}>
			Bloquer
		</button>
		: <button
			className={styles.profil_header_action}
			onClick={(e) => handleBlocked(e, "DELETE")}>
			Débloquer
		</button>
	}</>

}

export default ProfilBlockedButton;


