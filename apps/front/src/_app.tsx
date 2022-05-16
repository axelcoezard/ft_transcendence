import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { AppProvider, useAppContext } from "./contexts/AppContext";
import Login from "./pages/Login";
import Home from "./pages/Login";
import Rtc from "./pages/Rtc";

import "./styles/globals.scss";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
	const { session } = useAppContext();

	let test = session.has("access_token") ?? children
	return <>
		{console.log(test)}
		{test}
	</>
}


const _App = () => {
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<PrivateRoute>
					<Home />
				</PrivateRoute>} />
				<Route path="/rtc" element={<PrivateRoute>
					<Rtc />
				</PrivateRoute>} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
}
export default _App;
