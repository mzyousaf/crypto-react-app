import React, { useState, useEffect, Fragment } from 'react'
import minus from "../../assets/icons/minus-svgrepo-com.svg"
import plus from "../../assets/icons/plus-svgrepo-com.svg"

export default function DropDownV1(props) {

    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [isDropDownClosed, setIsDropDownClosed] = useState(true)

    useEffect(() => {
        if (props.options) {
            setOptions(props.options)
            if (selectedOption === null) {
                setSelectedOption(props.options[0])
            }
        }
    }, [props])

    const setOpenDrop = (status) => {
        setIsDropDownClosed(status)
    }
    return (
        <Fragment>
            <div className="counter-component-container pointer" style={props.style} onClick={() => { setOpenDrop(!isDropDownClosed) }}>
                <span className="button-text" style={{ color: "lightgray" }}>{props.label}</span>
                <div className="counter-container">
                    <div>
                        {/* <span className="button-text">{props.preText || "$"}</span> */}
                        <spna className="button-text">
                            {selectedOption}
                        </spna>
                    </div>
                    <div>
                        <i className="fas fa-chevron-down pointer" style={{ color: "lightgray" }}></i>
                    </div>
                </div>
            </div>

            {
                !isDropDownClosed &&
                <div className="mt-1" style={{ background: "rgb(35, 47, 71)", position: "absolute", zIndex: "10", height: "max-content", maxHeight: "90px", width: "125px", border: "1px solid #232f47", borderRadius: "3px", overflowY: "hidden" }}>
                    {
                        options.length > 0 && options.map((option, index) => {
                            return (
                                <div className="dropdown-option pointer" onClick={() => { setOpenDrop(!isDropDownClosed); setSelectedOption(option) }} >
                                    <span className="button-text">{option}</span>
                                </div>
                            )
                        })
                    }

                </div>
            }

        </Fragment>
    )
}
