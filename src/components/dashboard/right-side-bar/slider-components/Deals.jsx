import React, { useState } from 'react'
import StatusRow from '../../../common/StatusRow'

export default function Deals() {

    const [data, setData] = useState([
        { time: "15:28", profit: false, bank: "Induslnd Bank", amount: "0" },
        { time: "15:28", profit: true, bank: "Induslnd Bank", amount: "100" },
        { time: "15:28", profit: false, bank: "Induslnd Bank", amount: "20" },
        { time: "15:28", profit: true, bank: "Induslnd Bank", amount: "130" },
        { time: "15:28", profit: false, bank: "Induslnd Bank", amount: "20" },
    ])
    return (
        <div className="w-100 p-4" >
            <div className="p-2" style={{ background: "#2f3f61", minHeight: "300px", borderRadius: "7px", maxHeight: "310px", overflowY: "auto" }}>
                {
                    data.map((data, index) => {
                        return (
                            <div className="py-2" style={{ borderTop: `${index > 0 ? "1px solid lightgray" : "none"}` }}>
                                <StatusRow type="sidepanel" time={data.time} profit={data.profit} bank={data.bank} amount={data.amount} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
