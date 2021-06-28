import green from "./green.png";
import red from "./red.png"
const Arrow = (props) => {
    const link = props.profit ? green : red;
    console.log(props)
    return (
        <>

            <div className="d-flex justify-content-between align-items-around">
                <p>{props.value}</p>
                <img src={link} alt="placeholder" style={{ paddingTop: "5px", ...props.iconStyle }} />
            </div>
        </>
    );
}

export default Arrow;