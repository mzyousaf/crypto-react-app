import "../assets/styles/App.scss";
import LeftSideBar from '../components/dashboard/LeftSideBar'
import RightSideBar from '../components/dashboard/right-side-bar/RightSideBar'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory, useRouteMatch, withRouter } from "react-router";
import React, { useState, useEffect } from "react";

//Components
import Dashboard from "./dashboard/Content";
// import Analytics from "./analytics/Content";
import Education from "./education/Content";
import Finance from "./finance/Content";
import Info from "./info/Content";
// import Profile from "./profile/Content";
import Apps from "./app/Content";
import Navbar from '../components/dashboard/Navbar';
import { Modal, Button } from "react-bootstrap";
import DropDown from "../components/sub-components/DropDown";
import Profile from "../components/profile/Profile"
import Login from "./login/Content";
import SignUp from "./signup/Content";
import TradeHistory from "./trad-history/Context";
import StatsPopup from "../components/common/StatsPopup";
import { GlobalPopupContext } from "../context/GlobalPopup";

function App() {
	const [rightSidePanel, setRightSidePanel] = useState(false);

	const rightSideBar = (flag) => {
		setRightSidePanel(flag)
	}
	const [alert, setAlert] = useState(false);

	const history = useHistory()
	const { path } = useRouteMatch()
	const [globalPopupStatus, setGlobalPopupStatus] = useState({
		visiblityStatus: false,
		startTimmer: false
	})

	useEffect(() => {
		if (globalPopupStatus.startTimmer) {
			setTimeout(() => {
				setGlobalPopupStatus({ ...globalPopupStatus, visiblityStatus: true, startTimmer: false })
			}, 3000);
		}
	}, [globalPopupStatus.startTimmer])

	return (
		<div className="App" >
			<Switch>
				<Route exact path="/login" component={() => <Login history={history} />} />
				<Route exact path="/signup" component={() => <SignUp history={history} />} />
				<Route path="/">
					<GlobalPopupContext.Provider value={{ globalPopupStatus, setGlobalPopupStatus }}>
						<div className="dashboard-page-container">
							<Navbar />
							<div className="w-100 h-100 d-flex justify-content-between">
								{
									globalPopupStatus.visiblityStatus &&
									<div className="w-100 d-flex align-items-center justify-content-center" style={{ position: "absolute", zIndex: "999", height: "calc(100% - 57px)" }}>
										<div className="w-100 h-100" style={{ position: "absolute", backgroundColor: "#192235", opacity: "0.6" }}></div>
										<StatsPopup />
									</div>
								}
								<LeftSideBar history={history} />
								<div className="w-100">
									<Switch>
										<Route exact path={`${path}`} component={() => <Dashboard history={history} />} />
										<Route path={`${path}trade_history`} component={() => <TradeHistory history={history} />} />
										<Route path={`${path}education`} component={() => <Education history={history} />} />
										<Route exact path={`${path}finance`} component={() => <Finance history={history} />} />
										<Route path={`${path}info`} component={() => <Info history={history} />} />
										<Route path={`${path}profile`} component={() => <Profile history={history} />} />
										<Route path={`${path}apps`} component={() => <Apps history={history} />} />

									</Switch>


								</div>
								{
									history.location.pathname === "/" &&
									<RightSideBar alertCenter={(flag) => setAlert(flag)} rightSidePanel={(flag) => rightSideBar(flag)} />
								}
							</div>
						</div>
					</GlobalPopupContext.Provider>

				</Route>
			</Switch>
		</div>
	);
}

export default withRouter(App);