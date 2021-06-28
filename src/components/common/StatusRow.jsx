import React from 'react'
import Arrow from '../../views/Arrow/Arrow'
export default function StatusRow(props) {
    if (props.type == "sidepanel") {
        return (
            <div className="w-100 d-flex justify-content-between">
                <div className="d-flex flex-column align-items-start">
                    <span className="button-text">{props.time}</span>
                    <div className="d-flex align-items-center">
                        <Arrow profit={props.profit} iconStyle={{ width: "20px", height: "20px" }} />
                        <span className="button-text ml-2">{props.bank}</span>
                    </div>
                </div>
                <div>
                    <span className="button-text">{props.amount}$</span>
                </div>

            </div>
        )
    }
    else if (props.type == "tradeHistoryTable") {
        return (
            <div className="w-100 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <span className="button-text">{props.bank}</span>
                    <Arrow profit={props.profit} iconStyle={{ width: "20px", height: "20px", marginLeft: "1rem" }} />
                    <span className="button-text ml-3">{props.value}</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="button-text">{props.amount}$</span>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="button-text">{props.date}</span>
                    <span className="button-text">{props.time}</span>
                </div>

            </div>
        )
    }
    else if (props.type == "popup") {
        return (
            <div className="w-100 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <span className="button-text">{props.time}</span>
                    <Arrow profit={props.profit} iconStyle={{ width: "20px", height: "20px", marginLeft: "1rem" }} />
                    <span className="button-text ml-3">{props.value}</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="button-text">{props.amount}$</span>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="button-text">{props.otherAmount}$</span>
                </div>

            </div>
        )
    }
}
