import { useAppContext } from '../contexts/AppContext'
import exp from 'constants';
import {Link} from 'react-router-dom';

import Avatars from '../components/Avatars'
import styles from '../styles/Components.module.scss'
import VictoryCrown from './SVGs/VictoryCrown';

const HistoryPlayer = (props: any) => {
	const { session } = useAppContext();
	const { username } = props;

	if (username == session.get("username")) {
		return <div className={styles.history_player}>
			<Avatars.PurpleAvatar width="3vw" height="3vw"/> {/* BACK : User avatar */}
			<p className={styles.history_text}>{session.get("username")}</p> {/* BACK : User name */}
		</div>
	}
	else {
		return <div className={styles.history_player}>
			<p className={styles.history_text}>{username}</p> {/* BACK : Opponant name */}
			<Avatars.GreenAvatar width="3vw" height="3vw"/> {/* BACK : Opponant avatar */}
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

	if (winner == session.get("username")) {
		return <div className={styles.history_match_winner}>
			<VictoryCrown winner="true" /> 
			<h2 className={styles.history_h2}>VS</h2> 
			<VictoryCrown winner="false" />
		</div>
	}
	else {
		return <div className={styles.history_match_winner}>
			<VictoryCrown winner="false" /> 
			<h2 className={styles.history_h2}>VS</h2> 
			<VictoryCrown winner="true" />
		</div>
	}
}

const HistoryMatch = (props: any) => {
	const { opponant, winner } = props;

	return <div className={styles.history_match}>
		<HistoryMatchPlayers opponant={props.opponant}/>
		<HistoryMatchWinner winner={props.winner}/>
	</div>
}

// const History = () => {
	
// 	return  <div className={styles.history}>
// 		<div className={styles.history_matches}>
// 			<HistoryMatch opponant="mla-rosa" winner="mla-rosa"/>
// 			<HistoryMatch opponant="acoezard" winner="mboy"/>
// 			<HistoryMatch opponant="JB" winner="mboy"/>
// 		</div>
// 	</div>
// }

const MyCollection = [
	{
	  label: "First Picture",
	  imgPath:
  "https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png",
	},
	{
	  label: "Second Picture",
	  imgPath:
  "https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png",
	},
	{
	  label: "Third Picture",
	  imgPath:
  "https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png",
	},
  ];
   
  const History = () => {
	const CollectionSize = MyCollection.length;
	const theme = useTheme();
	const [index, setActiveStep] = React.useState(0);
   
	const goToNextPicture = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
   
	return (
	  <div
		style={{
		  marginLeft: "40%",
		}}
	  >
		<h2>How to Create Image Slider in ReactJS?</h2>
		<div
		  style={{
			maxWidth: 400,
			flexGrow: 1,
		  }}
		>
		  <Paper
			square
			elevation={0}
			style={{
			  height: 50,
			  display: "flex",
			  paddingLeft: theme.spacing(4),
			  backgroundColor: theme.palette.background.default,
			  alignItems: "center",
			}}
		  >
			<Typography>{MyCollection[index].label}</Typography>
		  </Paper>
		  <img
			src={MyCollection[index].imgPath}
			style={{
			  height: 255,
			  width: "100%",
			  maxWidth: 400,
			  display: "block",
			  overflow: "hidden",
			}}
			alt={MyCollection[index].label}
		  />
		  <MobileStepper
			variant="text"
			position="static"
			index={index}
			steps={CollectionSize}
			nextButton={
			  <Button
				size="small"
				onClick={goToNextPicture}
				disabled={index === CollectionSize - 1}
			  >
				Next
				{theme.direction !== "rtl" ? (
				  <KeyboardArrowRight />
				) : (
				  <KeyboardArrowLeft />
				)}
			  </Button>
			}
		  />
		</div>
	  </div>
	);
  };

export default History;

