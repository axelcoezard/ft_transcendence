import { useAppContext } from '../contexts/AppContext'
import exp from 'constants';
import {Link} from 'react-router-dom';

import styles from '../styles/Components.module.scss'
import VictoryCrown from './SVGs/VictoryCrown';
import * as React from "react";

const HistoryPlayer = (props: any) => {
	const { session } = useAppContext();
	const { username } = props;

	if (username == session.get("username"))
	{
		return <div className={styles.history_player}>
			{/*<Avatars.PurpleAvatar width="3vw" height="3vw"/> {/* BACK : User avatar */}
			<p className={styles.history_text}>{session.get("username")}</p> {/* BACK : User name */}
		</div>
	}
	else {
		return <div className={styles.history_player}>
			<p className={styles.history_text}>{username}</p> {/* BACK : Opponant name */}
			{/*<Avatars.GreenAvatar width="3vw" height="3vw"/> {/* BACK : Opponant avatar */}
		</div>
	}
}

const HistoryMatchPlayers = (props: any) => {
	const { session } = useAppContext();
	const { opponant } = props;

	return 	<div className={styles.history_match_players}>
		<HistoryPlayer username={session.get("username")}/> {/* BACK : User name */}
		<HistoryPlayer username={props.opponant} /> {/* BACK : Opponant name */}
	</div>
}

const HistoryMatchWinner = (props: any) => {
	const { session } = useAppContext();
	const { winner } = props;
	const isWinner = props.winner == session.get("username");

	return <div className={styles.history_match_winner}>
		<VictoryCrown winner={!isWinner} />
		<h2 className={styles.history_h2}>VS</h2>
		<VictoryCrown winner={isWinner} />
	</div>
}

const HistoryMatch = (props: any) => {
	return <div className={styles.history_match}>
		<HistoryMatchPlayers opponant={props.opponant}/>
		<HistoryMatchWinner winner={props.winner}/>
	</div>
}

const History = (props: any) => {
	return  <div className={styles.history}>
	</div>
}

export { HistoryMatch, HistoryMatchPlayers, HistoryMatchWinner }
export default History;

