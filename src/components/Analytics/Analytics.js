import { useState } from "react";
import Table from "./Table";
const Analytics = () => {
    const [sq, setSq] = useState("");
    const data=[
        {
            Assets:"54",
            totalAmount:"69",
            PaymentMethod:"Debit",
            date:"22/2/2000"
        },{
            Assets:"54",
            totalAmount:"69",
            PaymentMethod:"card",
            date:"22/2/2000"
        },{
            Assets:"14",
            totalAmount:"69",
            PaymentMethod:"Debit",
            date:"22/2/2000"
        },{
            Assets:"54",
            totalAmount:"69",
            PaymentMethod:"Debit",
            date:"1/2/2000"
        },{
            Assets:"24",
            totalAmount:"19",
            PaymentMethod:"Debit",
            date:"23/2/2000"
        },
    ]

    // console.log(columns)
    function search(rows){
        const col=rows[0] && Object.keys(rows[0]);
        // console.log(col)
        return rows.filter(
            (row)=>{
                col.some(
                    column=>row[column].toString().toLowerCase().indexOf(sq)>-1
                )
            }
        )
    }
    return (
        <>
            <div className="container-fluid h-100 d-flex align-items-center flex-column" style={{backgroundColor:"#192235",color:"#d6e2f5"}}>
                <div className="w-100">
                    <input type="text" style={{border:"1px solid #192235",borderRadius:"0px",backgroundColor:"#192235",color:"#d6e2f5"}} placeholder="SEARCH" value={sq} onChange={(e)=>setSq(e.target.value)}></input>
                </div>
                <Table data={search(data)}/>
            </div>
        </>
    );
}
 
export default Analytics;