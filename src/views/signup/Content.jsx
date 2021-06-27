import React from 'react';
import '../login/loginStyle.css';
import { useHistory } from "react-router-dom";
import Popup from "../../components/dashboard/Popup";


export default function SignUp(props) {
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
                        <div className="col-lg-6" d="imageAuthentication">
                            <div className="card1 pb-5">
                                <div className="row">
                                    <img src="https://i.imgur.com/CXQmsmF.png" alt="" className="logo" />
                                </div>
                                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <img src="https://i.imgur.com/uNGdWHi.png" className="image" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex w-100 align-items-center justify-content-center" >
                            <div className="card2 card border-0 px-4 py-5 w-75" style={{ height: "max-content" }}>
                                <div className="row mb-4 text-dark px-3">
                                    <div onClick={() => routeChange('login')}
                                        className={`mr-4 pb-2 pointer border-bottom ${props.history.location.pathname === "/login" ? "border-primary" : "border-dark"}`} style={{ border: '2px' }}>Login</div>
                                    <div onClick={() => routeChange('signup')}
                                        className={`mr-4 pb-2 pointer border-bottom  ${props.history.location.pathname === "/signup" ? "border-primary" : "border-dark"}`} style={{ border: '2px' }}>Sign Up</div>
                                </div>
                                <div className="row px-3 mt-4 d-flex justify-content-between">
                                    <input className="mb-4" style={{ width: "49%" }} type="text" name="fname" placeholder="First Name" />
                                    <input className="mb-4" style={{ width: "49%" }} type="text" name="lname" placeholder="Last Name" />
                                </div>
                                <div className="row px-3">
                                    <input className="mb-4" type="email" name="email" placeholder="Enter a valid email address" />
                                </div>
                                <div className="row px-3">
                                    <input type="password" name="password" placeholder="Enter password" />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <input id="chk1" type="checkbox" name="chk" className="custom-control-input" />
                                        <label htmlFor="chk1" className="custom-control-label text-sm text-dark">
                                            I accept terms and conditions, privacy policy
                                        </label>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-blue text-white" style={{ backgroundColor: "#192235" }}>Create Account</button>
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
