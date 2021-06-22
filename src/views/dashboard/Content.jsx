import React from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DropDown from "../../components/sub-components/DropDown";
import Button from "../../components/sub-components/Button";
import Counter from "../../components/sub-components/Counter";


export default function Dashboard(props) {
    const history = useHistory()

    console.log('Test Dashboard history ====>', history)

    const closePopup = () => {
        history.push({
            pathname: '/',
            state: { popup: false }
        })
    }

    return (
        <div className="page-container text-white">
            Dashboard

            {history?.location?.state?.popup &&
                <div style={{ zIndex: 999 }} >
                    <Modal.Dialog style={{ backgroundColor: "black" }}>
                        <Modal.Header >
                            <h5 className="text-dark">Bitcoin</h5>
                        </Modal.Header>

                        <Modal.Body>

                            <DropDown type="currency" />

                        </Modal.Body>

                        <Modal.Footer>
                            <div onClick={() => closePopup()}
                                style={{ background: 'green', padding: '10px', borderRadius: '3px', cursor: "pointer" }}>
                                Close
                            </div>
                            {/*<Button variant="primary">Save changes</Button>*/}
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            }
        </div>
    )
}
