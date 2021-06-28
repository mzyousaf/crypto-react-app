import React, { Fragment } from 'react';
import { useHistory } from "react-router"
import ReactRoundedImage from "react-rounded-image";
import Button from '../sub-components/Button'

export default function LeftSideBar(props) {
    const history = useHistory();

    console.log('Hisotry', history)
    const leftIcons = [
        { val: <i class="fas fa-chart-line "></i>, route: '/', name: 'Trade' },
        { val: <i class="far fa-credit-card "></i>, route: '/finance', name: 'Finances' },
        { val: <i class="fas fa-chart-pie "></i>, route: '/trade_history', name: 'Trade History' },
        { val: <i class="fas fa-user "></i>, route: '/profile', name: 'Profile' },
        { val: <i class="fab fa-windows "></i>, route: '/apps', name: 'App' },
        { val: <i class="fas fa-graduation-cap "></i>, route: '/education', name: 'Education' },
        { val: <i class="fas fa-info-circle"></i>, route: '/info', name: 'Help' }
    ];

    const sideBarIcon = (goTo) => {
        history.push(goTo);
    }

    return (
        <Fragment>
            <div className="left-side-bar-container on-laptop-display">

                <div className="icons-left-bar w-100">
                    {leftIcons?.map((item) => (
                        <div className={`icon-view icon-upper-half `}
                            style={{
                                color: history.location.pathname === item?.route ? "#3099F5" : "",
                                background: history.location.pathname === item?.route ? "#2f3f61" : "",
                                borderLeft: history.location.pathname === item?.route ? "3px solid #3099F5" : "3px solid #283049",
                                // borderTop: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049",
                                // borderBottom: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049"
                            }}
                            onClick={() => sideBarIcon(item?.route)}>
                            {item?.val}
                            <div className="route-names">
                                {item?.name}
                            </div>
                        </div>
                    ))
                    }
                </div>

            </div>

            <div id="mobile-left-side-bar" className="mobile-left-side-bar-container on-mobile-display">

                <div className="mobile-side-bar-content-container">
                    <div className="mobile-side-bar-content-profile-section">
                        <ReactRoundedImage image={null} roundedSize="0" imageWidth="100" imageHeight="100" />
                        <span className="body1" style={{ color: "white", fontWeight: "bolder" }}>Demo</span>
                        <span className="body2" style={{ color: "white", fontWeight: "bolder" }}>$10000</span>
                        <Button title={"Open live account"} style={{ backgroundColor: "#232f47", padding: "6px 10px", borderRadius: "50px" }} />
                    </div>

                    <div className="icons-left-bar w-100">
                        {leftIcons?.map((item) => (
                            <div className={`icon-view icon-upper-half `}
                                style={{
                                    color: history.location.pathname === item?.route ? "#3099F5" : "",
                                    background: history.location.pathname === item?.route ? "#2f3f61" : "",
                                    borderLeft: history.location.pathname === item?.route ? "3px solid #3099F5" : "3px solid transparent",
                                    // borderTop: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049",
                                    // borderBottom: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049"
                                }}
                                onClick={() => { sideBarIcon(item?.route); document.getElementById("mobile-left-side-bar").classList.remove("mobile-left-side-bar-extended") }}>
                                {item?.val}
                                <div className="route-names ml-3">
                                    <span className="body1 white-text"> {item?.name}</span>
                                </div>
                            </div>
                        ))
                        }
                    </div>

                </div>

            </div>
        </Fragment>
    )
}
