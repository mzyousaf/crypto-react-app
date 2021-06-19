import React, { useState } from 'react'
import minus from "../../assets/icons/minus-svgrepo-com.svg"
import plus from "../../assets/icons/plus-svgrepo-com.svg"

export default function Counter(props) {

    const [count, setCount] = useState(100)
    return (

        <div className="counter-component-container" style={props.style}>
            <span className="button-text" style={{ color: "lightgray" }}>{props.label}</span>
            <div className="counter-container">
                <div >
                    <i className="fa fa-minus pointer" style={{ color: "red" }} onClick={() => setCount(count - 1)}></i>
                </div>
                <div>
                    {/* <span className="button-text">{props.preText || "$"}</span> */}
                    <spna className="button-text">{count}$</spna>
                </div>
                <div>
                    <i className="fa fa-plus pointer" style={{ color: "green" }} onClick={() => setCount(count + 1)}></i>

                </div>
            </div>
        </div>
    )
}
