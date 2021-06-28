import React, { useState } from 'react'
import StatusRow from '../../components/common/StatusRow'
export default function Context() {

    const [data, setData] = useState([
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: false, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
        { bank: "Induslnd Bank", profit: true, value: 76.22481, amount: 25, date: "2021-06-28", time: "15:28:53" },
    ])
    return (
        <div className="page-container d-flex justify-content-center">
            <div className="trade-histroy-container">
                <span className="white-text heading4">
                    Trade History
                </span>
                <div className="trade-histroy-table">

                    {
                        data.map((data, index) => {
                            return (
                                <div className="p-2"
                                    style={{
                                        marginTop: `${index > 0 ? "0.75rem" : "m-0"}`,
                                        backgroundColor: "rgb(47, 63, 97)",
                                        borderLeft: `${data.profit ? "5px solid green" : "5px solid red"}`
                                    }}>
                                    <StatusRow type="tradeHistoryTable" bank={data.bank} profit={data.profit} value={data.value} amount={data.amount} date={data.date} time={data.time} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
