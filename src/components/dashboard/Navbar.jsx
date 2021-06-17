import React from 'react'
import logo from '../../assets/icons/logo.png'
import Button from '../sub-components/Button'

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="nav-logo-container">
                <img src={logo} />
            </div>
            <div className="nav-mid-section-container">
                <div className="nav-amount-container">
                    <spna className="caption" style={{ color: "#f3c955" }}>Demo Account</spna>
                    <span className="body2" style={{ color: "white" }}>$10000</span>
                </div>
                <div className="nav-btn-container">
                    <Button title={"Open live account"} />
                </div>

            </div>
            <div className="nav-logo-container">
                <i class="fa fa-2x fa-bars" style={{ color: "#00a6f0" }}></i>
            </div>
        </div>
    )
}
