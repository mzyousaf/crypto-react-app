import "../assets/styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

//Components
import AppComponent from "../components/AppComponent";
import DashboardPageContainer from "./pages/Dashboard/DashboardPageContainer";

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={DashboardPageContainer} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
