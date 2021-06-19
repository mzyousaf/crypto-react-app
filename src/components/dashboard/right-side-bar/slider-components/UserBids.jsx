import React, { useState } from 'react'
import Counter from "../../../sub-components/Counter"
import { Row, Col } from 'react-bootstrap'
import Button from '../../../sub-components/Button'
import DropDown from '../../../sub-components/DropDown'

export default function UserBids() {

    const [exchangeHistory, setExchangeHistory] = useState([
        { label: "EUR/USD", action: "Buy" },
        { label: "EUR/USD", action: "Sell" },
        { label: "EUR/USD", action: "Sell" }
    ])
    return (
        <div className="w-100 h-100 silder-inner-container">
            <div className="sider-innerbox-container">
                <Row className="m-0">
                    <Col xs="12" className=" p-0 d-flex justify-content-start">
                        <DropDown type="currency" />
                    </Col>
                    <Col xs="12" className="p-0 d-flex flex-column justify-content-start align-items-start mt-4">
                        <span className="body1" style={{ color: "lightgray" }}>Current Balance</span>
                        <span className="heading6 white-text mt-1">$10000</span>
                    </Col>
                    {/* <Col md="8" className="p-0 mt-4">
                        <Counter
                            style={{ width: "100%" }}
                            label="Strike Rate" />
                    </Col>

                    <Col md="4">
                    </Col> */}

                    <Col xs="6" className="pl-0 mt-4" style={{ marginTop: "25px" }}>
                        <Counter
                            style={{ width: "100%" }}
                            label="Amount" />
                    </Col>
                    <Col xs="6" className="pr-0" style={{ marginTop: "25px" }}>
                        {/* <DropDown type="currency" /> */}
                    </Col>

                    <Col xs="12" className="p-0 d-flex flex-column justify-content-start align-items-start mt-4">
                        <span className="body1" style={{ color: "lightgray" }}>Payout</span>
                        <span className="body1 mt-1" style={{ color: "green", fontSize: "20px" }}>$200</span>
                    </Col>

                </Row>
                <Row className="m-0 mt-4">
                    <Col xs="6" className="pl-0 d-flex " style={{ position: "relative" }}>
                        {/* <i class="fa fa-2x fa-chevron-down white-text" style={{ position: 'absolute' }}></i> */}
                        <Button title="SELL"
                            preIcon={<i class="fa fa-2x fa-chevron-down white-text" style={{ fontSize: "23px" }}></i>}
                            style={{ width: "100%", backgroundColor: "red", display: "flex", justifyContent: "space-around", alignItems: "center" }} />

                    </Col>

                    <Col xs="6" className="pr-0" style={{ position: "relative" }}>
                        <Button title="BUY"
                            preIcon={<i class="fa fa-2x fa-chevron-up white-text" style={{ fontSize: "23px" }}></i>}
                            style={{ width: "100%", backgroundColor: "green", display: "flex", justifyContent: "space-around", alignItems: "center" }} />
                    </Col>
                </Row>

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
        </div>
    )
}
