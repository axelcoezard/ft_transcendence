import React, { useState } from "react";
import { useEffect } from 'react'
import { useAppContext } from "../contexts/AppContext";
import useBall from "../hooks/useBall";
import useCanvas from "../hooks/useCanvas";
import usePaddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from "../hooks/usePaddle";

import styles from '../styles/Play.module.scss'
// import useColyseus from '../hooks/useColyseus';
import Avatars from "../components/Avatars";
import Pong from "../components/SVGs/Pong"
import WriteIcon from "../components/SVGs/WriteIcon";
import SendIcon from "../components/SVGs/SendIcon";
import CrossIcon from "../components/SVGs/CrossIcon";
import ReportIcon from "../components/SVGs/ReportIcon";
import Messages from "../components/Messages";
import { useParams } from 'react-router-dom';

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;

const Play = () => {
	const {session, socket} = useAppContext();
	const [started, setStarted] = useState<boolean>(false)
	const [position, setPosition] = useState<string>("spectator")

	const {id} = useParams()

	const left = usePaddle(20, 50)
	const right = usePaddle(PONG_WIDTH - PADDLE_WIDTH - 20, 50)
	const ball = useBall();

	let [messages, setMessages] = useState<any[]>([]);
	let [channels, setChannels] = useState<any[]>([]);
	let [value, setValue] = useState("");
	let {slug} = useParams();

	useEffect(() => {
		socket.emit("channel_join", {
			sender_id: session.get("id"),
			channel_slug: slug
		})
	}, [socket.current, slug])

	socket.on("channel_msg", (res: any) => {
		messages.unshift({
			id: messages.length + 1,
			...res
		})
		setMessages(messages)
	})

	socket.on("channel_set_list", (res: any) => setChannels(res))
	socket.on("channel_set_msg", (res: any) => setMessages(res))


	//try {
	//	colyseus.join("default_room", {})
	//	console.log("joined successfully");
	//  } catch (e) {
	//	console.error("join error", e);
	//  }

	socket.onAfterInit("paddleMove", (data: any) => {
		console.log(data.sender, session.get("username"))
		if (data.sender === session.get("username"))
			return;
		console.log(data.sender_position)
		if (data.sender_position === position)
			return;
		if (data.sender_position === "left")
			left.setY(data.y)
		if (data.sender_position === "right")
			right.setY(data.y)
	})

	socket.onAfterInit("ballMove", (data: any) => {
		ball.setY(data.y)
		ball.setX(data.x)
	})

	const render = (context: CanvasRenderingContext2D, _: any) => {
		context.fillStyle = "#60B5E7";
		context.fillRect(left.x, left.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#60B5E7";
		context.fillRect(right.x, right.y, PADDLE_WIDTH, PADDLE_HEIGHT)
		context.fillStyle = "#48DAC3";
		context.beginPath()
		context.arc(ball.x, ball.y, ball.diameter / 2, 0, 2 * Math.PI);
		context.fill();
	}

	const canvasRef = useCanvas((framecount: number) => {}, render);
	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (position === "spectator")
			return;
		const canvas = e.currentTarget || e.target;
		const y = e.clientY - canvas.getBoundingClientRect().y - 50;
		let player = position === "left" ? left : right;
		player.setY(y)
		socket.emit("paddleMove", "game", id, {
			sender: session.get("username"),
			sender_position: position,
			x: player.x,
			y: player.y
		})
	}

	return <main className={styles.play}>
		
		{/* PLAY CHAT */}
		<section className={styles.play_tchat}>

			{/* HEADER : PONG, EXIT, REPORT */}
			<div className={styles.tchat_header}>
				<Pong height="5.42vw"/>
				<div className={styles.tchat_header_options}>
					<CrossIcon width="1.5vw" height="1.5vw"/>
					<ReportIcon width="3.5vw" height="3.5vw"/>
				</div>
			</div>

			{/* CONVERSATION : INPUT, BUTTON */}
			<div className={styles.tchat_conversation}>
				<Messages origin="mboy" message={value} /> {/* BACK : send actually message */}
				<Messages origin="hoho" message={value} /> {/* BACK : send actually message */}
				<Messages origin="bobby" message={value} /> {/* BACK : send actually message */}
				<Messages origin="mboy" message={value} /> {/* BACK : send actually message */}
				<Messages origin="hoho" message={value} /> {/* BACK : send actually message */}
				<Messages origin="bobby" message={value} /> {/* BACK : send actually message */}
				<Messages origin="mboy" message={value} /> {/* BACK : send actually message */}
				<Messages origin="hoho" message={value} /> {/* BACK : send actually message */}
				<Messages origin="bobby" message={value} /> {/* BACK : send actually message */}
				<Messages origin="mboy" message={value} /> {/* BACK : send actually message */}
				<Messages origin="hoho" message={value} /> {/* BACK : send actually message */}
				<Messages origin="bobby" message={value} /> {/* BACK : send actually message */}
				
			</div>
			
			{/* SEND : INPUT, BUTTON */}
			<div className={styles.conversation_send}>
				<WriteIcon width="1.5vw" height="1.5vw" />
				<input className={styles.conversation_send_input} type="text" value={value}
				onChange={(e: any) => {
					setValue(e.currentTarget.value || e.target.value)
				}}/>
				<button className={styles.conversation_send_button} 
					onClick={(e) => {
						socket.emit("channel_msg", {
							sender_id: session.get("id"), 
							sender_username: session.get("username"),
							channel_slug: slug,
							type: "text",
							value: value
						})
					setValue("")}}>
					<SendIcon width="1.5vw" height="1.5vw" />
				</button>
			</div>
		</section>
		
		{/* PLAY PONG */}
		<section className={styles.play_pong}>
			
			{/* HEDAR : NMAE, CATCHPHRASE */}
			<div className={styles.pong_header}>
				<h1 className={styles.h1}>TRANSCENDENCE</h1>
				<h3 className={styles.h3}>Pong to the extrem!</h3>
			</div>
			
			{/* DAHSBOARD : PLAYERS, VS */}
			<div className={styles.pong_dashboard}>
				<div className={styles.pong_dashboard_user}>
					<Avatars.PurpleAvatar width="4.2vw" height="4.2vw" />
					<p className={styles.text}>{session.get("username")}</p>
				</div>
				<h2 className={styles.h2}>VS</h2>
				<div className={styles.pong_dashboard_opponant}>
					<p className={styles.text}>acozard</p>
					<Avatars.GreenAvatar width="4.2vw" height="4.2vw" />
				</div>
			</div>

			{/* PONG */}
			<canvas
				ref={canvasRef}
				width={PONG_WIDTH}
				height={PONG_HEIGHT}
				onMouseMove={handleMove}
			/>
		</section>
	</main>;
};

export default Play;
