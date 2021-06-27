import React from 'react';
import { useHistory } from "react-router-dom";
import Popup from "../../components/dashboard/Popup";
import DropDown from '../../components/sub-components/DropDown';

export default function Dashboard(props) {

    const history = useHistory()

    const alertPopup = () => {
        // props.centerAlert(true)

        history.push({
            pathname: '/',
            state: { popup: true }
        })
    }

    return (
        <div className="page-container text-white">
            <div className="w-100 justify-content-end pr-4 pt-4 on-mobile-display">
                <div onClick={() => alertPopup()} className="pointer">
                    <DropDown type="currency" />
                </div>
            </div>
            <Popup />
        </div>
    )
}
