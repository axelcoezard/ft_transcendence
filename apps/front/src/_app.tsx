import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";

import { AppProvider, useAppContext } from "./contexts/AppContext";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./styles/globals.scss";
import Profil from "./pages/Profil";
import Tchat from "./pages/Tchat";
import Play from "./pages/Play";
import Matching from "./pages/Matching"
import Wrapper from "./components/Wrapper";
import Settings from "./pages/Settings";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
	const { session } = useAppContext();
	const navigate = useNavigate();

	if (!session.has("access_token"))
		return <>{navigate("/")}</>

	return <Wrapper>{children}</Wrapper>;
}

const _App = () => {
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/profil" element={<PrivateRoute>
					<Profil />
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
				<Route path="/play/:id" element={<PrivateRoute>
					<Play />
				</PrivateRoute>} />
				<Route path="/matching_random" element={<PrivateRoute>
					<Matching type="random"/>
				</PrivateRoute>} />
				<Route path="/matching_invite" element={<PrivateRoute>
					<Matching type="invite"/>
				</PrivateRoute>} />
				<Route path="/matching_view" element={<PrivateRoute>
					<Matching type="view"/>
				</PrivateRoute>} />
				<Route path="/settings" element={<PrivateRoute>
					<Settings />
				</PrivateRoute>} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
}
export default _App;
