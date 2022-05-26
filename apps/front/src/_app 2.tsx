import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import Rtc from "./pages/Rtc";

import "./styles/globals.scss";

const _App = () => {
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rtc" element={<Rtc />} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
}
export default _App;
