import React from 'react'
import minus from "../../assets/icons/minus-svgrepo-com.svg"
import plus from "../../assets/icons/plus-svgrepo-com.svg"

export default function Counter(props) {
    return (

        <div className="counter-component-container" style={props.style}>
            <span className="button-text">{props.label}</span>
            <div className="counter-container">
                <div >
                    <img style={{ width: "24px", height: "24px" }} src={minus} />
                </div>
                <div>
                    <span className="button-text">{props.preText || "$"}</span>
                    <spna className="button-text">123</spna>
                </div>
                <div>
                    <img style={{ width: "24px", height: "24px" }} src={plus} />
                </div>
            </div>
        </div>
    )
}
