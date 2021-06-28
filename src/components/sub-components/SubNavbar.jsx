import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router'

export default function SubNavbar(props) {

    const [seletecLink, setSeletecLink] = useState(0)

    const [links, setLinks] = useState([])
    const history = useHistory()
    const { path } = useRouteMatch()
    const setHistory = (index) => {
        setSeletecLink(index)
        props.getStep(index)
        // history.push(`${path}${links[index].route}`)
    }

    useEffect(() => {
        setLinks(props.links)
    }, [props.links])
    return (
        <div className="sub-navbar-container">
            {
                links.map((link, index) => {
                    return (
                        < Fragment>
                            <div
                                className={`h-100 d-flex justify-content-center align-items-center px-4 ${seletecLink === index ? "selected-option" : "option"}`}
                                onClick={() => setHistory(index)}
                            >
                                <spna className="">{link.name}</spna>
                            </div>
                        </Fragment>

                    )
                })
            }
        </div >
    )
}
