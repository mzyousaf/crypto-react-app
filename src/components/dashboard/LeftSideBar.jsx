import React from 'react';
import {useHistory} from "react-router"

export default function LeftSideBar(props) {
    const history = useHistory();

    console.log('Hisotry', history )
    const leftIcons = [
         {val: <i class="fas fa-chart-line "></i> , route: '/', name: 'Trade' },
         {val: <i class="far fa-credit-card "></i>, route: '/finance', name: 'Finances' },
         {val: <i class="fas fa-user "></i>, route: '/profile', name: 'Profile' },
         {val: <i class="fab fa-windows "></i>, route: '/apps', name: 'App' },
         {val: <i class="fas fa-chart-pie "></i>, route: '/analytics', name: 'Analytics' },
         {val: <i class="fas fa-graduation-cap "></i>, route: '/education', name: 'Education' },
         {val: <i class="fas fa-info-circle"></i>, route: '/info', name: 'Help' }
    ];

    const sideBarIcon = (goTo) => {
        history.push(goTo);
    }

    return (
        <div className="left-sdie-bar-conrainer">
            
            <div className="icons-left-bar">
                {leftIcons?.map( (item)=> (
                    <div className={`icon-view icon-upper-half `}  
                        style = { {
                                    color: history.location.pathname === item?.route ? "#3099F5" : "", 
                                    background: history.location.pathname === item?.route ? "#2f3f61" : "", 
                                    borderLeft: history.location.pathname === item?.route ? "3px solid #3099F5" : "3px solid #283049",
                                    borderTop: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049",
                                    borderBottom: history.location.pathname === item?.route ? "1px solid #3099F5" : "1px solid #283049"
                                } } 
                        onClick={() => sideBarIcon(item?.route) }>
                        {item?.val}
                        <div className="route-names">
                            {item?.name}
                        </div>
                    </div>
                ) )
                }
            </div>
            
        </div>
    )
}
