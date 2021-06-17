import React from 'react'

export default function Button(props) {
    return (
        <div className="plain-button" style={props.style}>
            <span className="button-text">{props.title}</span>
        </div>
    )
}
