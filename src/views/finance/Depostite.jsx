import React, { useState } from 'react'
import DropDownV1 from '../../components/sub-components/DropDownV1'
import Input from '../../components/sub-components/Input'
import Button from '../../components/sub-components/Button'
import { Fragment } from 'react'
export default function Depostite() {

    const [step, setStep] = useState(1)

    const step1 = () => {
        return (
            <Fragment>
                <DropDownV1 invert style={{ width: "100%" }} options={["Paypal", "Paytm", "Razorpy"]} />
                <div className="d-flex w-100 justify-content-between align-items-center mt-3">
                    <DropDownV1 invert options={["$ USD", "₹ IDR"]} style={{ width: "21%" }} />
                    <Input style={{ width: "75%" }} placeholder="amount" />
                </div>

                <div className="d-flex align-items-start mt-3">
                    <input className="mt-1" style={{ width: "max-content" }} type="checkbox"></input>
                    <div className="d-flex ml-4" style={{ width: "92%", textAlign: "start" }}>
                        <span className="body2 white-text">{"I agree to Terms & conditions. Refund policy. Payment info policy."}</span>
                    </div>
                </div>

                <div className="w-100 mt-3 d-flex justify-content-end">
                    <Button title={"Continue"} style={{ padding: "5px 10px" }} onClick={() => setStep(2)} />
                </div>
            </Fragment>
        )
    }

    const step2 = () => {
        return (
            <Fragment>
                <div className="d-flex flex-column align-items-start">
                    <span className="caption white-text">Confirm your E-mail</span>
                    <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Email" />
                </div>

                <div className="w-100 d-flex mt-3 justify-content-between">
                    <div className="d-flex flex-column align-items-start" style={{ width: "70%" }}>
                        <span className="caption white-text">Card number</span>
                        <Input style={{ width: "100%", marginTop: "5px" }} placeholder="0000-0000-0000-0000" />
                    </div>
                    <div className="d-flex flex-column align-items-start" style={{ width: "25%" }}>
                        <span className="caption white-text">CCV/CVC</span>
                        <Input type="password" style={{ width: "100%", marginTop: "5px" }} placeholder="000" />
                    </div>
                </div>
                <div className="d-flex flex-column align-items-start mt-3">
                    <span className="caption white-text">Cardholder name</span>
                    <Input style={{ width: "100%", marginTop: "5px" }} />
                </div>
                <div className="w-100 d-flex mt-3 justify-content-between">
                    <div className="d-flex flex-column align-items-start" style={{ width: "48%" }}>
                        <span className="caption white-text">Expirey Month</span>
                        <DropDownV1 invert style={{ width: "100%", marginTop: "5px" }} options={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]} />
                    </div>
                    <div className="d-flex flex-column align-items-start" style={{ width: "48%" }}>
                        <span className="caption white-text">Expirey Yesr</span>
                        <DropDownV1 invert style={{ width: "100%", marginTop: "5px" }} options={["2021", "2022", "2023"]} />
                    </div>
                </div>

                <div className="d-flex justify-content-between  " >
                    <div className="mt-3 d-flex justify-content-start " style={{ width: "28%" }}>
                        <Button title={"Back"} style={{ padding: "5px 10px", width: "100%", backgroundColor: "red" }} onClick={() => setStep(1)} />
                    </div>
                    <div className="mt-3 d-flex justify-content-end" style={{ width: "68    %" }}>
                        <Button title={"Deposit $100"} style={{ padding: "5px 10px", width: "100%" }} onClick={() => { }} />
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className=" w-100 h-100 d-flex justify-content-center" style={{ paddingTop: "200px" }}>
            <div className="px-2 py-3" style={{ width: "390px", height: "max-content", backgroundColor: "rgb(47, 63, 97)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "5px" }}>
                {
                    step === 1
                        ?
                        <Fragment>
                            {step1()}
                        </Fragment>
                        :
                        <Fragment>
                            {step2()}
                        </Fragment>
                }
            </div>
        </div>
    )
}
