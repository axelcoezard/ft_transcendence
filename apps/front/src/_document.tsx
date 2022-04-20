import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";

import "./styles/globals.scss";

export default () => {
	return <AppProvider>
		<BrowserRouter>

			<Home />
		</BrowserRouter>
	</AppProvider>
}

