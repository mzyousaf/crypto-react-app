import React from 'react'

export default function Input(props) {
    return (
        <div style={{ height: "46px", ...props.style }}>
            <input
                style={{ backgroundColor: "#1a243a", color: "white", border: "1px solid #1a243a", borderRadius: "7px" }}
                placeholder={props.placeholder}
                type={props.type}
            ></input>
        </div>
    )
}
