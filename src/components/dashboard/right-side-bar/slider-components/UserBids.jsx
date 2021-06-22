import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import Counter from "../../../sub-components/Counter"
import { Row, Col, Modal } from 'react-bootstrap'
import Button from '../../../sub-components/Button'
import DropDown from '../../../sub-components/DropDown'

export default function UserBids(props) {
    const [alert, setAlert] = useState(false)
    const history = useHistory()

    const alertPopup = () => {
        // props.centerAlert(true)

        history.push({
            pathname: '/',
            state: { popup: true }
        })
    }

    return (
        <div className="w-100 h-100 silder-inner-container">

            <div className="sider-innerbox-container">
                <Row className="m-0">
                    <Col xs="12" className=" p-0 d-flex justify-content-start">
                        <div className="pointer" onClick={() => alertPopup()}>
                            <DropDown type="currency" />
                        </div>
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

                    <Col xs="6" className="pl-0" style={{ marginTop: "25px" }}>
                        <Counter
                            style={{ width: "100%" }}
                            label="Amount" count={true} />

                    </Col>
                    <Col xs="6" className="pr-0" style={{ marginTop: "25px" }}>
                        <Counter
                            style={{ width: "100%" }}
                            label="Expiry" count={false}
                        />
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


            </div>


        </div>
    )
}
