import { Component, ContextType, useEffect, useLayoutEffect, useState } from 'react'
import styles from '../../styles/pages/Chat.module.scss'
import AppContext, { AppContextType, useAppContext } from '../../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../../hooks/useSession';
import Avatar from '../../components/Avatar';

const ChatChannel = (props: any) => {
	const { channel } = props;

	return <li className={styles.chat_channel}>
		<Link to={`/chat/${channel.slug}`}>
			{channel.name}
		</Link>
	</li>
}

export default ChatChannel
