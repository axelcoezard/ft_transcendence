import { BrowserRouter,	Routes,	Route, useNavigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import useSession from "./hooks/useSession";

import "./styles/_globals.scss";

import Wrapper from "./components/Wrapper";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Tchat from "./pages/Tchat";
import Play from "./pages/Play";
import Matching from "./pages/Matching"
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";
import Watch from "./pages/Watch";
import Ranking from "./pages/Ranking";
import { useEffect } from "react";

const PublicRoute = ({children}: {children: JSX.Element}) => {
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		if (session.has("access_token"))
			navigate("/home");
	}, [])

	return <>{children}</>;
}

const PrivateRoute = ({children}: {children: JSX.Element}) => {
	const session = useSession("session");
	const navigate = useNavigate();

	useEffect(() => {
		if (!session.has("access_token"))
			navigate("/");
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
				<Route path="/profil" element={<PrivateRoute>
					<Profil />
				</PrivateRoute>} />
				<Route path="/rank" element={<PrivateRoute>
					<Ranking />
				</PrivateRoute>} />
				<Route path="/home" element={<PrivateRoute>
					<Home />
				</PrivateRoute>} />
				<Route path="/tchat" element={<PrivateRoute>
					<Tchat />
				</PrivateRoute>} />
				<Route path="/tchat/:slug" element={<PrivateRoute>
					<Tchat />
				</PrivateRoute>} />
				<Route path="/play/wait" element={<PrivateRoute>
					<Matching />
				</PrivateRoute>} />
				<Route path="/play/invite" element={<PrivateRoute>
					<Invite />
				</PrivateRoute>} />
				<Route path="/play/watch" element={<PrivateRoute>
					<Watch />
				</PrivateRoute>} />
				<Route path="/play/:id" element={<PrivateRoute>
					<Play />
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
