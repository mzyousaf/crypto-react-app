import React from 'react'

export default function Button(props) {
    return (
        <div className="plain-button" style={props.style}>
            {props.preIcon}
            <span className="button-text">{props.title}</span>
        </div>
    )
}
