import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Counter from '../../../sub-components/Counter'

export default function Trends() {

    const [exchangeHistory, setExchangeHistory] = useState([
        { label: "EUR/USD", action: "Buy" },
        { label: "EUR/USD", action: "Sell" },
        { label: "EUR/USD", action: "Sell" }
    ])

    return (
        <div className="w-100 p-4">
            <div className="w-50">
                <Counter
                    time
                    style={{ width: "100%" }}
                    label="Time" count={false}
                />
            </div>
            <Row className="m-0 mt-4">
                <Col xs="12" className="p-0">
                    {exchangeHistory.map((history, index) => {
                        return (
                            <div key={index} className="w-100 d-flex justify-content-between py-1" style={{ borderBottom: "0.25px solid #2f3f61" }}>
                                <span style={{ color: "lightgray" }} className="body2">{history.label}</span>
                                <div className="w-25 d-flex justify-content-start">
                                    <span style={{ color: `${history.action === "Buy" ? "green" : "red"}` }} className="body2">{history.action}</span>
                                </div>
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}
