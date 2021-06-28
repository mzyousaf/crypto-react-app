import React, { Fragment } from 'react'
import DropDownV1 from '../../components/sub-components/DropDownV1'
import Input from '../../components/sub-components/Input'
import Button from '../../components/sub-components/Button'

export default function Withdraw() {
    return (
        <div className=" w-100 h-100 d-flex justify-content-center" style={{ paddingTop: "200px" }}>
            <div className="px-2 py-3" style={{ width: "390px", height: "max-content", backgroundColor: "rgb(47, 63, 97)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "5px" }}>

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <DropDownV1 invert options={["$ USD", "₹ IDR"]} style={{ width: "20%" }} />
                    <Input style={{ width: "75%" }} placeholder="amount" />
                </div>
                <div className="d-flex flex-column align-items-start mt-2">
                    <span className="body2 white-text">{"Choose withdraw system"}</span>
                    <DropDownV1 invert style={{ width: "100%", marginTop: "5px" }} options={["Paypal", "Paytm", "Razorpy"]} />
                </div>
                <div className="d-flex align-items-start mt-3">
                    <Input style={{ width: "100%" }} placeholder="Phone number" />
                </div>

                <div className="w-100 mt-3 d-flex justify-content-end">
                    <Button title={"Withdraw"} style={{ padding: "5px 10px" }} />
                </div>
            </div>
        </div>
    )
}
