import "../assets/styles/App.scss";
import LeftSideBar from '../components/dashboard/LeftSideBar'
import RightSideBar from '../components/dashboard/RightSideBar'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import React, {useState} from "react";

//Components
import Dashboard from "./dashboard/Content";
import Analytics from "./analytics/Content";
import Education from "./education/Content";
import Finance from "./finance/Content";
import Info from "./info/Content";
import Profile from "./profile/Content";
import Apps from "./app/Content";
import Navbar from '../components/dashboard/Navbar';

function App() {
	const [rightSidePanel, setRightSidePanel] = useState(false);

	const rightSideBar = (flag) => {
		setRightSidePanel(flag)
	}

	return (
		<div className="App">
			<div className="dashboard-page-container">
            <Navbar />
            <div className="w-100 h-100 d-flex justify-content-between">
			
			<LeftSideBar history={history}/>
			
				<Switch>
					<Route exact path="/" component={() => <Dashboard history={history} />} />
					<Route exact path="/analytics" component={() => <Analytics history={history} />} />
					<Route exact path="/education" component={() => <Education history={history} />} />
					<Route exact path="/finance" component={() => <Finance history={history} />} />
					<Route exact path="/info" component={() => <Info history={history} />} />
					<Route exact path="/profile" component={() => <Profile history={history} />} />
					<Route exact path="/apps" component={() => <Apps history={history} />} />
				</Switch>
			
			{rightSidePanel &&
				<div className="w-20 h-100 d-flex justify-content-end">
					Hello BAR
				</div>
			}
			<RightSideBar rightSidePanel={(flag)=> rightSideBar(flag)} />
			
			</div>
        </div>
		</div>
	);
}

export default withRouter(App);
