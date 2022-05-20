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
import Tchat from "./pages/Tchat";
import Play from "./pages/Play";
import Wrapper from "./components/Wrapper";

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
				<Route path="/home" element={<PrivateRoute>
					<Home />
				</PrivateRoute>} />
				<Route path="/tchat/:slug" element={<PrivateRoute>
					<Tchat />
				</PrivateRoute>} />
				<Route path="/play" element={<PrivateRoute>
					<Play />
				</PrivateRoute>} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
}
export default _App;
