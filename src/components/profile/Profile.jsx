import { useState } from "react";
import "./profile.css"
import _ from "underscore";

const Profile = () => {
    const days = (_.range(1,32));
    const years = (_.range(1950,2022));
    const Months = (["January","February","March","April","May","June","July",
    "August","September","October","November","December"]);
    const [FileName, setFileName] = useState("CLICK TO SELECT");
    const handleChange=(event) =>{
        setFileName(event.target.files[0].name)
      }
    return ( 
        <>
            <div className="container-fluid h-100 d-flex align-items-center flex-column" style={{backgroundColor:"#192235",color:"#d6e2f5"}}>
                        
                <div className="w-50 position-relative pt-2">
                    <div className="position-absolute top-0 start-0">
                        <h4>Avatar</h4>
                    </div>
                    <div className="container pt-5">
                        <div className="row">
                            <div className="col nopadding d-flex align-items-center" style={{
                                height:"120px",
                                border:"1px dotted rgb(214, 226, 245,.8)"
                            }}>
                                <label className="p-5" id="getFileLabel" for="getFile" style={{cursor:"pointer"}}>{FileName}</label>
                                <input onChange={handleChange} type="file" id="getFile" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-50 position-relative pt-2">
                    <div className="position-absolute top-0 start-0">
                        <h4>Personal Info</h4>
                    </div>
                    <div className="container">
                        <div className="row pt-5">
                            <label className="float-left">Birthday</label>

                        </div>
                        <div className="row pt-1">
                        

                            <div className="col nopadding pr-2">
                                <select className="form-control selectWidth" style={{border:"1px solid rgb(214, 226, 245,.5)",backgroundColor:"#192235",color:"#d6e2f5"}}>
                                    <option style={{backgroundColor:"#192235"}}>Day Not Selected</option>
                                    {
                                        days.map((no,id)=>{return <option style={{backgroundColor:"#192235"}} key={id}>{no}</option>})
                                    }
                                </select>
                            </div>

                            <div className="col nopadding pr-2">

                                <select className="form-control selectWidth" style={{border:"1px solid rgb(214, 226, 245,.5)",backgroundColor:"#192235",color:"#d6e2f5"}}>
                                    <option style={{backgroundColor:"#192235"}}>Month Not Selected</option>
                                    {
                                        Months.map((no,id)=>{return <option style={{backgroundColor:"#192235"}} key={id}>{no}</option>})
                                    }
                                </select>
                            </div>

                            <div className="col nopadding pr">
                                <select className="form-control selectWidth" style={{border:"1px solid rgb(214, 226, 245,.5)",backgroundColor:"#192235",color:"#d6e2f5"}}>
                                    <option style={{backgroundColor:"#192235"}}>Year Not Selected</option>
                                    {
                                        years.map((no,id)=>{return <option style={{backgroundColor:"#192235"}} key={id}>{no}</option>})
                                    }
                                </select>
                            </div>
                            
                        </div>
                        <div className="row pt-2">
                            <label>Phone</label>
                            <input type="email" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>
                        <div className="row pt-2" > 
                            <label style={{color:"#d6e2f5"}}>Email</label>
                            <input type="email" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>
                    </div>
                </div>

                <div className="w-50 position-relative pt-2 ">
                    <div className="position-absolute top-0 start-0">
                        <h4>Address</h4>
                    </div>
                    <div className="container">

                        <div className="row pt-5">
                            <label style={{color:"#d6e2f5"}}>Country</label>
                            <input type="text" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>
                        <div className="row pt-2">
                        <div className="col pr-2 nopadding" style={{width:"70%"}}>
                            <label className="float-left" style={{color:"#d6e2f5"}}>City</label>
                            <input type="text" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>
                        <div className="col nopadding" style={{width:"30%"}}>
                            <label className="float-left" style={{color:"#d6e2f5"}}>ZIP</label>
                            <input type="number" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>
                        </div>

                        <div className="row pt-1 pb-3">
                            <label style={{color:"#d6e2f5"}}>Street Address</label>
                            <input type="text" style={{border:"1px solid rgb(214, 226, 245,.2)",backgroundColor:"#192235",color:"#d6e2f5"}}></input>
                        </div>

                    </div>
                </div>
                
            </div>
        </>
    );
}
 
export default Profile;