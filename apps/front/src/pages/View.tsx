import styles from "../styles/Invite.view.module.scss"
import { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import { useParams } from 'react-router-dom';
import SendIcon from '../components/SVGs/SendIcon';

const View = () => {
	const [value, setValue] = useState("");
	const {session, socket} = useAppContext();
	let {slug} = useParams();
	
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (value.length < 1
			|| value.length > 255
			|| value.match(/^\s+$/)
		) return;

		socket.emit("msg", "chat", slug, {
			id: session.get("id"),
			username: session.get("username"),
			channel_slug: slug,
			type: "text",
			value: value
		})
		setValue("")
	}

	return <div className={styles.invite_view}>
		<h1 className={styles.invite_view_h1}>VIEW</h1>
		<div className={styles.invite_view_content}>
			<input className={styles.invite_view_input}
				type="text"
				value={value}
				placeholder="Enter private viewing code"
				onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
			}}/>
			<button className={styles.invite_view_button}
				onClick={handleSubmit}
				onSubmit={handleSubmit}>
				<p className={styles.invite_view_text}>JOIN</p>
			</button>
		</div>
	</div>
}

export default View;
