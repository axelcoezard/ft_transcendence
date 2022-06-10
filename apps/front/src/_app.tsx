import { BrowserRouter,	Routes,	Route, useNavigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import useSession from "./hooks/useSession";
import { useEffect } from "react";

import "./styles/_globals.scss";

import Wrapper from "./components/Wrapper";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Chat from "./pages/Chat";
import Play from "./pages/Play";
import Matching from "./pages/Matching"
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";
import Watch from "./pages/Watch";
import Ranking from "./pages/Ranking";
import ChatCreate from "./pages/ChatCreate";
import TwoFactorAuth from "./pages/2FA";
import ChatEdit from "./pages/ChatEdit";

const PublicRoute = ({children}: {children: JSX.Element}) => {
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		let challenge = !session.get("2FA_status") || session.get("2FA_challenge");
		if (challenge && session.has("access_token"))
			navigate("/home");
	}, [])

	return <>{children}</>;
}

const PrivateRoute = ({children}: {children: JSX.Element}) => {
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		if (session.has("access_token"))
		{
			let challenge = !session.get("2FA_status") || session.get("2FA_challenge");
			if (!challenge)	navigate("/2FA");
		}
		else navigate("/");
	}, [])

	return <Wrapper>{children}</Wrapper>;
}

const NotFoundRoute = () => {
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		if (session.has("access_token"))	navigate("/home");
		else								navigate("/");
	}, [])

	return <></>;
}

const _App = () => {
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PublicRoute>
					<Login />
				</PublicRoute>} />
				<Route path="/2fa" element={<PublicRoute>
					<TwoFactorAuth />
				</PublicRoute>} />
				<Route path="/home" element={<PrivateRoute>
					<Home />
				</PrivateRoute>} />
				<Route path="/play/wait" element={<PrivateRoute>
					<Matching />
				</PrivateRoute>} />
				<Route path="/play/watch" element={<PrivateRoute>
					<Watch />
				</PrivateRoute>} />
				<Route path="/play/:id" element={<PrivateRoute>
					<Play />
				</PrivateRoute>} />
				<Route path="/chat" element={<PrivateRoute>
					<Chat />
				</PrivateRoute>} />
				<Route path="/chat/invite" element={<PrivateRoute>
					<Invite />
				</PrivateRoute>} />
				<Route path="/chat/create" element={<PrivateRoute>
					<ChatCreate />
				</PrivateRoute>} />
				<Route path="/chat/:slug" element={<PrivateRoute>
					<Chat />
				</PrivateRoute>} />
				<Route path="/chat/:slug/edit" element={<PrivateRoute>
					<ChatEdit />
				</PrivateRoute>} />
				<Route path="/ranking" element={<PrivateRoute>
					<Ranking />
				</PrivateRoute>} />
				<Route path="/profil" element={<PrivateRoute>
					<Profil />
				</PrivateRoute>} />
				<Route path="/profil/:id" element={<PrivateRoute>
					<Profil />
				</PrivateRoute>} />
				<Route path="/settings" element={<PrivateRoute>
					<Settings />
				</PrivateRoute>} />
				<Route path="*" element={<NotFoundRoute />} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
}
export default _App;
