import React from 'react'
import LeftSideBar from '../../../components/dashboard/LeftSideBar'
import RightSideBar from '../../../components/dashboard/RightSideBar'
import Navbar from '../../../components/dashboard/Navbar'

export default function DashboardPageContainer() {
    return (
        <div className="dashboard-page-container">
            <Navbar />
            <div className="w-100 h-100 d-flex justify-content-between">
                <LeftSideBar />

                <div>

                </div>

                <RightSideBar />

            </div>


        </div>
    )
}
