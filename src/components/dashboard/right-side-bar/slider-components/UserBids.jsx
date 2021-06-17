import React from 'react'
import Counter from "../../../sub-components/Counter"
import { Row, Col } from 'react-bootstrap'
import Button from '../../../sub-components/Button'

export default function UserBids() {
    return (
        <div className="w-100 h-100 silder-inner-container">
            <div className="sider-innerbox-container">
                <Row className="m-0">

                    <Col md="8" className="p-0">
                        <Counter
                            style={{ width: "100%" }}
                            label="Strike Rate" />
                    </Col>

                    <Col md="4">
                    </Col>

                    <Col md="6" className="pl-0" style={{ marginTop: "25px" }}>
                        <Counter
                            style={{ width: "100%" }}
                            label="Amount" />
                    </Col>
                    <Col md="6" className="pr-0" style={{ marginTop: "25px" }}>
                        <Counter
                            style={{ width: "100%" }}
                            label="Time"
                        />
                    </Col>

                </Row>
                <Row className="m-0">
                    <Col md="6" className="pl-0" style={{ marginTop: "25px" }}>
                        <Button title="Call" style={{ width: "100%", backgroundColor: "green" }} />
                    </Col>

                    <Col md="6" className="pr-0" style={{ marginTop: "25px" }}>
                        <Button title="Putt" style={{ width: "100%", backgroundColor: "red" }} />
                    </Col>

                </Row>
            </div>
        </div>
    )
}
