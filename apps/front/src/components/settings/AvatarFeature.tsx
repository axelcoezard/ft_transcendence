import styles from '../../styles/pages/Settings.module.scss'
import useSession from '../../hooks/useSession';
import { useState } from 'react';
import { SettingsFeature } from '../../pages/Settings';
import Avatar from '../Avatar';

const AvatarFeature = () => {
	const session = useSession("session");
	const [status, setStatus] = useState<string | null>();
	const [avatar, setAvatar] = useState<File>();

	const handleChange = async (e: any) => setAvatar(e.target.files[0])

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!avatar)
			return setStatus("No file selected")

		const formData = new FormData();
		formData.append("file", avatar, avatar.name);
		let res = await fetch(
			`http://localhost:3030/users/${session.get("id")}/avatar`,
			{
				method: "POST",
				headers: {
					'Authorization': `Bearer ${session.get("request_token")}`
				},
				body: formData
			}
		).then(res => res.json())

		if (res.error)
			return setStatus(res.error)
		setStatus("Avatar change")
		session.set("avatar_id", res.id)
	}

	return SettingsFeature("Changer mon avatar", "ohlala cherie", <form>
		<Avatar user={session.get("id")} width="120px" height="120px" />
		<p className={styles.settings_feature_error}>{status}</p>
		<input
			type="file"
			accept="image/*"
			multiple={false}
			className={styles.settings_feature_input_file}
			onChange={handleChange}
		/>
		 <button
			onClick={handleSubmit}
			className={styles.settings_feature_activate}>
			Changer
		</button>
	</form>)
}

export default AvatarFeature;
