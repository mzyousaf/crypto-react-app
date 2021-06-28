import Arrow from '../Arrow/Arrow'
import "./Popup.css"
const Popup = (props) => {
    const keys = Object.keys(props.body);
    //close function will be passed from where it's visibility is being set
    return ( 
        <>
            <div className="d-flex justify-content-center ">
                <div className="parent m-auto">
                {/* className={{backgroundColor:"#232f47"}} */}
                        <div className="modal-dialog modal-lg" style={{
                            height:"250px",
                            margin:"0",
                            padding:"0"
                        }}>
                            <div className="modal-content">
                            <div className="modal-header" style={{
                                backgroundColor:"#00a6f0"
                            }}>
                                <h4 className="modal-title" style={{color:"White"}}>
                                    {props.bankTitle}
                                    </h4>
                            </div>
                            <div className="modal-body" style={{padding:"0px",backgroundColor:"#232f47"}}>
                                <table  className="table table-dark w-100" style={{backgroundColor:"#232f47",color:"white"}}>
                                <tbody>
                                    {
                                        props.body.map(
                                            (e,k)=>{
                                                return(
                                                    <tr key={k}>
                                                        <td>{e.time}</td>
                                                        <td>{<Arrow value={e.value} profit={e.profit}/>}</td>
                                                        <td>{e.in}</td>
                                                        <td>{e.out}</td>

                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                                </table>
                            </div>
                            <div className="modal-footer btn btn-primary d-flex  justify-content-center">
                                close
                            </div>
                            </div>
                        </div>


                </div>
            </div>
        </>
    );
}
 
export default Popup;