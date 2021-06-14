import React from "react";
import logo from "../assets/icons/logo.svg";
import { useSelector, useDispatch } from "react-redux";

import {signIn} from "../redux/actions/authAction";

export default function AppComponent() {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
                Edit <code>src/App.js</code> and save to reload.
				</p>
				{
					auth
						?
						<a className="App-link"	href="https://reactjs.org" target="_blank"	rel="noopener noreferrer">
							Learn React
						</a>
						:
						<div className="d-flex flex-column">
							<a className="App-link">
							Login To learn react.
							</a>
							<span style={{fontSize: "34px", color: "red"}} onClick={()=> dispatch(signIn())}>Use Redux Click</span>
						</div>

				}
				
			</header>
		</div>
	);
}
