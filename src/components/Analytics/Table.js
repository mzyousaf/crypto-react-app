const Table = (props) => {
    const {data}=props;
    console.log(data)
    return ( 
        <table class="table table-dark" style={{
            backgroundColor:"#192235"
        }}>
            <thead>
                <tr>
                    <th scope="col">Assets</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Paymnet Method</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                {/* {
                    data.map((row,index)=>{
                    // {console.log(index)}
                    
                    return(    
                        <>
                            {
                                <tr key={index}>
                                    <td>{row.Assets}</td>
                                    <td>{row.totalAmount}</td>
                                    <td>{row.PaymentMethod}</td>
                                    <td>{row.date}</td>
                                </tr>
                            }
                        </>
                    )
                })} */}
            </tbody>
        </table>
    );
}
 
export default Table;