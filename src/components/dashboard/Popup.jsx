import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DropDown from "../../components/sub-components/DropDown";
import ReactRoundedImage from "react-rounded-image";

export default function Popup(props) {
    const history = useHistory();
    const [asset, setAsset] = useState()
    const [selectedOption, setSelectedOption] = useState(null)

    const closePopup = () => {
        history.push({
            pathname: '/',
            state: { popup: false },
            selectedModalOption: selectedOption
        })
    }

    const assets = [
        { id: 1, name: 'All', format: 'all' },
        { id: 2, name: 'Cryptocurrencies', format: 'crypto' },
        { id: 3, name: 'Currencies', format: 'currency' },
    ]

    const currency = [
        { id: 1, name: 'BTC/USD', value: '-4.38', percent: '20%', format: 'crypto' },
        { id: 2, name: 'Tron', value: '+72.3', percent: '51%', format: 'currency' },
        { id: 3, name: 'SIlver', value: '-27.4', percent: '44%', format: 'currency' },
        { id: 4, name: 'Gold', value: '+11.53', percent: '16%', format: 'currency' },
        { id: 5, name: 'CAKE/USD', value: '+19.24', percent: '23%', format: 'crypto' },
    ]

    useEffect(() => (
        setAsset(currency)
    ), [])

    const filterCurency = (value) => {

        if (value !== 'all') {
            const filteredCurrency = currency.filter((item) => (item.format === value));
            setAsset(filteredCurrency)
        } else {
            setAsset(currency)
        }
    }

    const handleChange = (e) => {
        console.log("Seee Currency", e.target.value);

        if (e.target.value) {
            const filteredCurrency = currency.filter((user) => (
                user.name.toLowerCase().indexOf(e.target.value) != -1
            ))
            setAsset(filteredCurrency)
        } else {
            setAsset(currency)
        }

    }

    return (
        <div>

            {history?.location?.state?.popup &&
                <div style={{ zIndex: 999 }} className="d-flex justify-content-center" >
                    <Modal.Dialog>
                        <Modal.Body>
                            <div className="d-flex justify-content-between">
                                <h5 className="white-text text-left ">Select Assets</h5>
                                <h5 className="text-left pointer" style={{ color: "lightgray" }} onClick={() => closePopup()}>X</h5>
                            </div>
                            <div className="input-group position-relative mt-2">
                                <div className="input-group-prepend position-absolute" style={{ left: '0px', zIndex: '9' }}>
                                    <button id="button-addon2" type="submit" className="btn btn-link text-dark">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                                <input type="search" placeholder="What're you searching for?"
                                    aria-describedby="button-addon2"
                                    onChange={(e) => handleChange(e)}
                                    className="pl-5 form-control w-100 border-0" />
                            </div>

                            <div className="d-flex flex-row my-4 flex-wrap">
                                {assets?.map((item, id) => (
                                    <div key={id}
                                        className="rounded bg-primary pointer text-white px-4 mt-2 py-2  mr-2"
                                        onClick={() => filterCurency(item.format)}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex flex-column w-100 modal-list-section" style={{ overflowY: 'auto' }}>
                                {asset?.map((item, id) => (
                                    <div key={id}
                                        onClick={() => { closePopup(); setSelectedOption(item) }}
                                        className="d-flex flex-row justify-content-between rounded text-white px-4 py-2 my-1 mr-2 pointer modal-selection">
                                        <div className="d-flex align-items-center">
                                            <ReactRoundedImage image={null} roundedSize="0" imageWidth="30" imageHeight="30" />
                                            <span className="ml-3">{item.name}</span>
                                        </div>

                                        <div>
                                            <span className="mr-3">{item.value}</span>
                                            <span style={{ color: `${id % 2 == 0 ? "red" : "green"}` }}>{item.percent}</span>
                                        </div>


                                    </div>
                                ))}
                            </div>

                            {/*<DropDown type="currency" />*/}

                        </Modal.Body>

                        {/* <Modal.Footer>
                            <div onClick={() => closePopup()}
                                style={{ background: 'green', padding: '10px', borderRadius: '3px', cursor: "pointer" }}>
                                Close
                            </div>
                        </Modal.Footer> */}
                    </Modal.Dialog>
                </div>
            }
        </div>
    )
}
