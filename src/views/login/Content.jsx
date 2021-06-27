import React from 'react';
import './loginStyle.css';
import { useHistory } from "react-router-dom";
import Popup from "../../components/dashboard/Popup";


export default function Login(props) {

    const routeChange = (route) => {
        if (route === 'login') {
            props.history.replace('/login');
        }
        else {
            props.history.replace('/signup');
        }
    }

    return (
        <div className="page-container text-white d-flex justify-content-center align-items-center">
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex" style={{ backgroundColor: "#192235" }}>
                        <div className="col-lg-6" id="imageAuthentication">
                            <div className="card1 pb-5">
                                <div className="row">
                                    <img src="https://i.imgur.com/CXQmsmF.png" alt="" className="logo" />
                                </div>
                                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <img src="https://i.imgur.com/uNGdWHi.png" className="image" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 w-100 d-flex align-items-center justify-content-center">
                            <div className="card2 card border-0 px-4 py-5 w-75" style={{ height: "max-content" }}>
                                <div className="row mb-4 text-dark px-3">
                                    <div
                                        onClick={() => routeChange('login')}
                                        className={`mr-4 pb-2 border-bottom pointer ${props.history.location.pathname === "/login" ? "border-primary" : "border-dark"}`} style={{ border: '2px' }}>Login</div>
                                    <div
                                        onClick={() => routeChange('signup')}
                                        className={`mr-4 pb-2 border-bottom pointer ${props.history.location.pathname === "/signup" ? "border-primary" : "border-dark"}`} style={{ border: '2px' }}>Sign Up</div>
                                </div>

                                <div className="row px-3 mt-4">
                                    <input className="mb-4" type="text" name="email" placeholder="Enter a valid email address" />
                                </div>
                                <div className="row px-3">
                                    <input type="password" name="password" placeholder="Enter password" />
                                </div>
                                <div className="row mt-4 justify-content-between items-center px-3 mb-4">
                                    <div>
                                        <a href="#" className="text-sm">Forgot Password?</a>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-blue text-white" style={{ backgroundColor: "#192235" }}>Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
