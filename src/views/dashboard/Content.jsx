import React from 'react';
import {useHistory} from "react-router-dom";
import Popup from "../../components/dashboard/Popup";


export default function Dashboard(props) {

    return (
        <div className="page-container text-white">
            Dashboard

            <Popup />
        </div>
    )
}
