import styles from '../../styles/pages/Settings.module.scss'
import useSession from '../../hooks/useSession';
import { useState } from 'react';
import { SettingsFeature } from '../../pages/Settings';
import Avatar from '../Avatar';

const ColorFeature = (props: any) => {
	const { title, type } = props;
	const session = useSession("session");
	const [status, setStatus] = useState<string | null>();
	const [color, setColor] = useState<string>(() => {
		return session.get(`color_${type}`) || "#ffffff";
	});

	const handleChange = async (e: any) => {
		setColor(e.target.value)
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!color)
			return setStatus("No color selected")

		let res = await fetch(
			`http://localhost:3030/users/${session.get("id")}/color/${type}`,
			{
				method: "POST",
				headers: {
					'Authorization': `Bearer ${session.get("request_token")}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ color })
			}
		).then(res => res.json())

		if (res.error)
			return setStatus(res.error)
		setStatus("Color changed")
		session.set(`color_${type}`, color)
	}

	return SettingsFeature(title, "", <form>
		<p className={styles.settings_feature_error}>{status}</p>
		<input
			type="color"
			className={styles.settings_feature_input_color}
			value={color}
			onChange={handleChange}
		/>
		 <button
			onClick={handleSubmit}
			className={styles.settings_feature_activate}>
			Changer
		</button>
	</form>)
}

export default ColorFeature;
