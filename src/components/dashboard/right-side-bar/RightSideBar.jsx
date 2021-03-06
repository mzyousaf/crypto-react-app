import React, { useEffect, useState } from 'react';
import Deals from "./slider-components/Deals"
import Trends from "./slider-components/Trends"
import Social from "./slider-components/Social"
import UserBids from "./slider-components/UserBids"

import { ReactComponent as DollarIcon } from "../../../assets/icons/dollar.svg"

export default function RightSideBar(props) {
    const [alert, setAlert] = useState(false)

    const leftIcons = [
        {
            val: <DollarIcon width="21px" height="21px" fill="inherit" style={{ marginBottom: "5px" }} />, name: 'Earn',
            component: <UserBids centerAlert={(flag) => setAlert(flag)} />
        },
        { val: <i class="fas fa-exchange-alt"></i>, name: 'Deals', component: <Deals /> },
        { val: <i class="fas fa-bolt"></i>, name: 'Trends', component: <Trends /> },
        { val: <i class="fas fa-users"></i>, name: 'Social', component: <Social /> }
    ];

    const [rightSide, setRightSide] = useState(false);
    const [selectedSection, setSelectedSection] = useState({
        index: 0,
        name: "Earn",
        component: <UserBids centerAlert={(flag) => setAlert(flag)} />
    })

    useEffect(() => (
        props.alertCenter(alert)
    ), [alert])

    const sideBarIcon = (goTo) => {
        // history.push(goTo);
    }

    const rightSideBar = (index, itemName, component) => {
        // console.log(index, itemName, component)
        // console.log(selectedSection)

        if (selectedSection.name === itemName) {
            setSelectedSection({
                ...selectedSection, index: null, name: "", component: null
            })
            setRightSide(false);
            document.getElementById("right-side-bar-slider").classList.remove("slider-width-transition");
            document.getElementById("bottom-side-bar-slider").classList.remove("slider-height-transition")

            props.rightSidePanel(true);
        }
        else {
            setSelectedSection({
                ...selectedSection, index: index, name: itemName, component: component
            })
            setRightSide(true);
            document.getElementById("right-side-bar-slider").classList.add("slider-width-transition");
            document.getElementById("bottom-side-bar-slider").classList.add("slider-height-transition")

            props.rightSidePanel(false);
        }
    }

    return (
        <div className={"tablet-view-bottom-bar"} onBlur={() => {
            document.getElementById("right-side-bar-slider").classList.remove("slider-width-transition");
            document.getElementById("bottom-side-bar-slider").classList.remove("slider-height-transition")
        }}>
            <div className="right-side-bar-container position-relative tablet-bar-hide">

                <div className="icons-right-bar">
                    {leftIcons?.map((item, index) => (
                        <div className={`icon-view icon-upper-half `}
                            style={{
                                color: selectedSection.name === item.name ? "#3099F5" : "",
                                fill: selectedSection.name === item.name ? "#3099F5" : "",
                                background: selectedSection.name === item.name ? "#2f3f61" : "",
                                borderRight: selectedSection.name === item.name ? "3px solid #3099F5" : "3px solid #232f47"
                            }}
                            onClick={() => rightSideBar(index, item.name, item.component)}
                        >
                            {item?.val}
                            <div className="route-names">
                                {item?.name}
                            </div>
                        </div>
                    ))
                    }
                </div>
                {
                    <div className="right-side-bar-slider slider-width-transition bottom-side-bar-slider" id="right-side-bar-slider">
                        {selectedSection.component}
                    </div>
                }


            </div>

            <div className="bottom-bar-container position-relative tablet-bar-show">

                <div className="bottom-bar">
                    <div className="icons-bottom-bar">
                        {leftIcons?.map((item, index) => (
                            <div className={`icon-view icon-upper-half `}
                                style={{
                                    color: selectedSection.name === item.name ? "#3099F5" : "",
                                    fill: selectedSection.name === item.name ? "#3099F5" : "",
                                    background: selectedSection.name === item.name ? "#2f3f61" : "",
                                    borderBottom: selectedSection.name === item.name ? "3px solid #3099F5" : "3px solid #232f47"
                                }}
                                onClick={() => rightSideBar(index, item.name, item.component)}
                            >
                                {item?.val}
                                <div className="route-names">
                                    {item?.name}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                {
                    <div className="bottom-side-bar-slider" id="bottom-side-bar-slider">
                        {selectedSection.component}
                    </div>
                }


            </div>

        </div>
    )
}
