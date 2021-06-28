import React, { Fragment, useState } from 'react'
import { Switch, useRouteMatch, Route } from 'react-router'
import SubNavbar from '../../components/sub-components/SubNavbar'
import Depostite from './Depostite'
import Analytics from '../../components/Analytics/Analytics'
import Withdraw from './Withdraw'

export default function Finance(props) {

    const { path } = useRouteMatch()

    const [step, setStep] = useState(0)
    const getStep = (step) => {
        setStep(step)
        console.log(step)
    }

    const links = [
        { name: "Deposite", icon: null, route: "/deposite" },
        { name: "Withdraw", icon: null, route: "/payment_history " },
        { name: "Payment History", icon: null, route: "/payment_history " }
    ]

    return (
        <div className="page-container">
            <SubNavbar links={links} getStep={getStep} />

            <div className="w-100" style={{ height: "calc(100% - 60px)" }}>
                {
                    step === 0
                        ?
                        <Depostite />
                        :
                        <Fragment>
                            {
                                step === 1
                                    ?
                                    <div className="p-0">
                                        <Withdraw />
                                    </div> :
                                    <div className="p-5">
                                        <Analytics />
                                    </div>
                            }
                        </Fragment>

                }
            </div>
        </div>
    )
}
