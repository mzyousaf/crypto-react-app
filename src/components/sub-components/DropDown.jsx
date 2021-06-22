import React, { useState } from 'react'
import ReactRoundedImage from "react-rounded-image";


export default function DropDown(props) {

    const [selected, setSelected] = useState({ id: 0, image: null, title: "BTC/USD", percentage: "83" })
    const [options, setOptions] = useState([
        { id: 0, image: null, title: "BTC/USD", percentage: "83" },
        { id: 1, image: null, title: "BTC/USD", percentage: "92" },
        { id: 2, image: null, title: "BTC/USD", percentage: "53" },
        { id: 3, image: null, title: "BTC/USD", percentage: "13" }
    ])

    if (props.type === "currency") {
        return (
            <div className="dropdown">
                <div className="d-flex align-items-center" style={{ justifyContent: "space-between" }}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "150px" }}>
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "100px" }}>
                            <ReactRoundedImage image={selected.image} roundedSize="0" imageWidth="30" imageHeight="30" />
                            <spna className="body2 white-text" style={{ height: "max-content" }}>{selected.title}</spna>
                        </div>
                        <spna style={{ color: "green", height: "max-content" }}>{selected.percentage}%</spna>
                    </div>
                    <i class="fa  fa-chevron-down" style={{ color: "lightgray" }}></i>
                </div>
            </div>
        )
    }

}
