import { Component, ContextType, useEffect, useLayoutEffect, useState } from 'react'
import styles from '../../styles/pages/Chat.module.scss'
import AppContext, { AppContextType, useAppContext } from '../../contexts/AppContext';
import { Link, useParams } from 'react-router-dom';
import useSession from '../../hooks/useSession';
import Avatar from '../../components/Avatar';

const ChatChannel = (props: any) => {
	const { channel, slug } = props;

	return <Link
		to={`/chat/${channel.slug}`}
		className={
			slug === channel.slug
			? styles.chat_index_channel_current
			: styles.chat_index_channel
		}>
		{channel.name}
	</Link>
}

export default ChatChannel
