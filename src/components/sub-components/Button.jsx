import React from 'react'

export default function Button(props) {
    return (
        <div className="plain-button pointer" style={props.style} onClick={props.onClick}>
            {props.preIcon}
            <span className="button-text">{props.title}</span>
        </div>
    )
}
