import React, { useState } from 'react';

export default function RightSideBar(props) {

    const leftIcons = [
        { val: <i class="fas fa-exchange-alt"></i>, name: 'Deals' },
        { val: <i class="fas fa-bolt"></i>, name: 'Trends' },
        { val: <i class="fas fa-users"></i>, name: 'Social' },
    ];

    const [rightSide, setRightSide] = useState(false);

    const sideBarIcon = (goTo) => {
        // history.push(goTo);
    }

    const rightSideBar = () => {
        setRightSide(rightSide => !rightSide);

        if (rightSide) {
            props.rightSidePanel(true);
        } else {
            props.rightSidePanel(false);
        }
    }

    return (
        <div className="left-sdie-bar-conrainer">

            <div className="icons-left-bar">
                {leftIcons?.map((item) => (
                    <div className={`icon-view icon-upper-half `}
                        onClick={() => rightSideBar()}
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
    )
}
