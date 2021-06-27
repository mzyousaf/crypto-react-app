import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import logo from '../../assets/icons/logo.png'
import Button from '../sub-components/Button'

export default function Navbar() {

    const history = useHistory()
    return (
        <Fragment>
            <div className="navbar-container on-laptop-display">
                <div className="nav-logo-container">
                    <i class="fa fa-2x fa-bars" style={{ color: "#00a6f0" }}></i>
                </div>
                <div className="nav-mid-section-container">
                    <div className="nav-amount-container">
                        <spna className="caption" style={{ color: "#f3c955" }}>Demo Account</spna>
                        <span className="body2" style={{ color: "white" }}>$10000</span>
                    </div>
                    <div className="nav-btn-container">
                        <Button title={"Open live account"} onClick={() => { history.push("/login") }} />
                    </div>

                </div>
                <div className="nav-logo-container">
                    <img src={logo} />

                </div>
            </div>

            <div className="mobile-navbar-container on-mobile-display">
                <div className="mobile-nav-logo-container ">
                    <i class="fa  fa-bars" style={{ color: "white", fontSize: "22px" }} onClick={() => { document.getElementById("mobile-left-side-bar").classList.add("mobile-left-side-bar-extended") }}></i>
                </div>
                <div className="mobile-nav-mid-section-container">
                    <div className="mobile-nav-amount-container">
                        <span className="body2" style={{ color: "white", fontWeight: "bolder" }}>$10000</span>
                    </div>
                    <div className="mobile-nav-btn-container ml-3">
                        <Button title={"Open live account"} onClick={() => { history.push("/login") }} style={{ backgroundColor: "#232f47", padding: "6px 10px" }} />
                    </div>

                </div>
                <div className="mobile-nav-logo-container">
                    <img src={logo} />

                </div>
            </div>

        </Fragment>
    )
}
