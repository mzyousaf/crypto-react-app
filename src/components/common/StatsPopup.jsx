import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DropDown from "../../components/sub-components/DropDown";
import ReactRoundedImage from "react-rounded-image";
import StatusRow from './StatusRow';
import { GlobalPopupContext } from '../../context/GlobalPopup';

export default function StatsPopup(props) {

    const [data, setData] = useState([
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: false, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
        { profit: true, value: 76.22481, amount: 25, otherAmount: 10, time: "15:28:53" },
    ])

    const { globalPopupStatus, setGlobalPopupStatus } = useContext(GlobalPopupContext)
    return (
        <div style={{ width: "380px" }}>
            <div style={{ zIndex: 999 }} className="d-flex w-100 justify-content-center" >
                <Modal.Dialog className="stats-popup-dialog">
                    <Modal.Header>
                        <span className="white-text">Induslnd</span>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            data.map((data, index) => {
                                return (
                                    <div className="p-2"
                                        style={{
                                            marginTop: `${index > 0 ? "0.75rem" : "m-0"}`,
                                            backgroundColor: "rgb(47, 63, 97)",
                                            borderLeft: `${data.profit ? "5px solid green" : "5px solid red"}`
                                        }}>
                                        <StatusRow type="popup" profit={data.profit} value={data.value} amount={data.amount} otherAmount={data.otherAmount} time={data.time} />
                                    </div>
                                )
                            })
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <div onClick={() => { setGlobalPopupStatus({ ...globalPopupStatus, visiblityStatus: false }) }}>
                            Close
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}
