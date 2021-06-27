import "../assets/styles/App.scss";
import LeftSideBar from '../components/dashboard/LeftSideBar'
import RightSideBar from '../components/dashboard/right-side-bar/RightSideBar'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory, useRouteMatch, withRouter } from "react-router";
import React, { useState, useEffect } from "react";

//Components
import Dashboard from "./dashboard/Content";
import Analytics from "./analytics/Content";
import Education from "./education/Content";
import Finance from "./finance/Content";
import Info from "./info/Content";
import Profile from "./profile/Content";
import Apps from "./app/Content";
import Navbar from '../components/dashboard/Navbar';
import { Modal, Button } from "react-bootstrap";
import DropDown from "../components/sub-components/DropDown";
import Login from "./login/Content";
import SignUp from "./signup/Content";

function App() {
	const [rightSidePanel, setRightSidePanel] = useState(false);

	const rightSideBar = (flag) => {
		setRightSidePanel(flag)
	}
	const [alert, setAlert] = useState(false);

	const history = useHistory()

	return (
		<div className="App" >

			<Switch>
				<Route exact path="/login" component={() => <Login history={history} />} />
				<Route exact path="/signup" component={() => <SignUp history={history} />} />
				<Route path="/">
					<div className="dashboard-page-container">
						<Navbar />
						<div className="w-100 h-100 d-flex justify-content-between">

							<LeftSideBar history={history} />
							<div className="w-100">
								<Switch>
									<Route exact path="" component={() => <Dashboard history={history} />} />
									<Route exact path="analytics" component={() => <Analytics history={history} />} />
									<Route exact path="education" component={() => <Education history={history} />} />
									<Route exact path="finance" component={() => <Finance history={history} />} />
									<Route exact path="info" component={() => <Info history={history} />} />
									<Route exact path="profile" component={() => <Profile history={history} />} />
									<Route exact path="apps" component={() => <Apps history={history} />} />

								</Switch>


							</div>
							{
								history.location.pathname === "/" &&
								<RightSideBar alertCenter={(flag) => setAlert(flag)} rightSidePanel={(flag) => rightSideBar(flag)} />
							}


						</div>
					</div>

				</Route>
			</Switch>
		</div>
	);
}

export default withRouter(App);
