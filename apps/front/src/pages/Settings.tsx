import styles from '../styles/pages/Settings.module.scss'
import TwoFactorFeature from '../components/settings/TwoFactorFeature';
import UsernameFeature from '../components/settings/UsernameFeature';
import AvatarFeature from '../components/settings/AvatarFeature';
import ColorFeature from '../components/settings/ColorFeature';

const SettingsFeature = (title: string, subtitle: string, children: JSX.Element) => {
	return <li className={styles.settings_feature}>
		<div className={styles.settings_feature_title}>
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
		<div className={styles.settings_feature_body}>{children}</div>
	</li>
}

export {SettingsFeature}

const Settings = () => {
	return <main className={styles.settings}>
		<div className={styles.settings_header}>
			<div className={styles.settings_header_container}>
				<h1>Settings</h1>
			</div>
		</div>
		<ul className={styles.settings_features}>
			<UsernameFeature />
			<AvatarFeature />
			<ColorFeature title="Couleur de mon paddle" type="paddle" />
			<TwoFactorFeature />
		</ul>
	</main>
}

export default Settings;
