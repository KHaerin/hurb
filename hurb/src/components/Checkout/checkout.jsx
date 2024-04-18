import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faWallet, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import EditAddress from './EditAdd';
export default function checkout(){

    const[tracks, setTrack] = useState([]);
    const[qtyField, setQtyField] = useState('');
    const runningBarRef = useRef(null);
    const [totalAmount, setTotalAmount] = useState('');

    useEffect(() => {
        fetchCartProducts();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const fetchCartProducts = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost/hurb/track_select.php?user_id=${user_id}`);
            const dataFetch = response.data;
            let total = 0;
            const processedData = await Promise.all(dataFetch.map(async (item) => {
                const productResponse = await axios.get(`http://localhost/hurb/products.php?product_id=${item.product_id}`);
                const productData = productResponse.data[0]; 
                const totalAmount = item.product_qty * productData.product_price;
                total += totalAmount;
                return { ...item, ...productData, totalAmount };
            }));
            setTotalAmount(total);
            setTrack(processedData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const updateQuantity = async (track_id, newQuantity) => {
        try {
            const formData = new FormData();
            formData.append('track_id', track_id);
            formData.append('product_qty', newQuantity);

            const response = await axios.post("http://localhost/hurb/update_quantity.php", formData);
            fetchCartProducts();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const handleQuantityChange = (track_id, newQuantity) => {
        const existingTrack = tracks.find(track => track.track_id === track_id);
        const currentStock = existingTrack.product_stock;
    
        if (newQuantity > currentStock) {
            alert('Exceeded available stock');
        } else {
            updateQuantity(track_id, newQuantity);
        }
    };


    const increaseQuantity = (track_id, currentQuantity) => {
        const newQuantity = parseInt(currentQuantity) + 1;
        handleQuantityChange(track_id, newQuantity);
    };

    const decreaseQuantity = (track_id, currentQuantity) => {
        if (parseInt(currentQuantity) > 1) {
            const newQuantity = parseInt(currentQuantity) - 1;
            handleQuantityChange(track_id, newQuantity);
        }
    };

    const handleScroll = () => {
        const runningBar = runningBarRef.current;
        const checkoutDetails = document.getElementById('checkout-details');
        if (runningBar && checkoutDetails) {
            const checkoutDetailsTop = checkoutDetails.getBoundingClientRect().top;
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollPosition > checkoutDetailsTop) {
                runningBar.style.position = 'static';
            } else {
                runningBar.style.position = 'fixed';
                runningBar.style.bottom = '0';
            }
        }
    };

    const [addressData, setAddressData] = useState({});
    const [addressPlacementSuccessful, setAddressPlacementSuccessful] = useState(false); // New state for address placement success

    const handlePlaceAddress = (addressData) => {
        // Handle the address data here
        // Update the state with address details, latitude, and longitude
        // For example:
        setAddressData(addressData);
        setAddressPlacementSuccessful(true);
    };

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <hr className="border border-dark border-1 opacity-75"/>
                </div>
            </div>
            <div className="row row-cols-1">
                <div className="col mb-3">
                    <span id="checkout-labels">Shipping Address</span>
                </div>
                <div className="col-lg-8 mb-5">
                    <div className="container" id="ship-address-container">
                        <div className="row">
                            <div className="col p-4">
                                <div className="contain">
                                    <span>
                                        John Pogi Bakit
                                    </span>
                                </div>
                                <div className="contain">
                                    <span>
                                        09123969691
                                    </span>
                                </div>
                                <div className="contain">
                                    <span>
                                        Sabang, Danao Cebu, Philippines 6069
                                    </span>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-end align-items-center">
                                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="AddressBtn">Edit Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 mb-5">
                <div className="col">
                    <span id="checkout-labels">Order Details</span>
                </div>
                <div className="col-auto d-flex">
                    {tracks.map((track, index) => (
                        <div className="container" key={track.track_id}>
                            <div className="row">
                                <div className="col d-flex flex-column justify-content-center align-items-center text-center">
                                    <img src={`http://localhost/hurb/${track.product_img}`} alt="" id="checkout-product-img"/>
                                    <span>{track.product_size.toUpperCase()}</span>
                                    <span id="price-text">${track.product_price}.00</span>
                                    <div className="input-group mb-3" id="qtybox">
                                            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button"  onClick={() => decreaseQuantity(track.track_id, track.product_qty)} id="minusBtn-cart">-</button>
                                            <input type="text" className="form-control" value={track.product_qty} onChange={(e) => setQtyField(e.target.value)} aria-label="Example text with two button addons" id="qtyField-cart"/>
                                            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button" onClick={() => increaseQuantity(track.track_id, track.product_qty)} id="plusBtn-cart">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row row-cols-1 mb-5">
                <div className="col mb-2">
                    <span id="checkout-labels">Shipping Options</span>
                </div>
                <div className="col-lg-8">
                    <div className="container p-4" id="ship-address-container">
                        <div className="row row-cols-1">
                            <div className="col d-flex gap-3 mb-4">
                            <FontAwesomeIcon icon={faTruck} id="shipping-icon" />
                            <span>Standard Shipping</span>
                            </div>
                            <div className="col">
                                <span>{'( Arrives between April 1 - May 1)'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 mb-4">
                <div className="col mb-2">
                    <span id="checkout-labels">Payment Method</span>
                </div>
                <div className="col mb-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" defaultChecked/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <FontAwesomeIcon icon={faHandHoldingDollar} id="payment-icons" /> 
                            <span id="payment-text">Cash On Delivery</span>
                        </label>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" disabled/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <FontAwesomeIcon icon={faWallet} id="payment-icons"/> 
                            <span id="payment-text">Gcash (Soon to be available)</span>
                        </label>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" disabled/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <FontAwesomeIcon icon={faWallet} id="payment-icons"/>
                            <span id="payment-text">Paypal (Soon to be available)</span>
                        </label>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" disabled/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <FontAwesomeIcon icon={faCreditCard} id="payment-icons"/> 
                            <span id="payment-text">Credit / Debit Card (Soon to be available)</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 mb-5">
                <div className="col">
                    <span id="checkout-labels">Voucher Code</span>
                </div>
                <div className="col-auto">
                    <div className="input-group mb-3">
                        <input type="text" id="voucherInput" className="form-control" placeholder="Enter Voucher Code" aria-label="Enter Voucher Code" aria-describedby="button-addon2"/>
                        <button className="btn btn-secondary" type="button" id="button-addon2">Apply</button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 mb-5" id="checkout-details">
                <div className="col-lg-12">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <span id="checkout-labels-1">Subtotal <span id="checkout-label-2">(# items)</span></span>
                            </div>
                            <div className="col">
                                <span>${totalAmount}.00</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span id="checkout-labels-1">Service and Insurance Fee </span>
                            </div>
                            <div className="col">
                               <span>$15.00</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span id="checkout-labels-1">Store Discount </span>
                            </div>
                            <div className="col">
                                <span>0.00</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span id="checkout-labels-1">Shipping Fee Subtotal</span>
                            </div>
                            <div className="col">
                                <span>$100.00</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <hr className="border border-dark border-1 opacity-75" id="totalHr"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span id="checkout-labels-1">Total</span>
                            </div>
                            <div className="col">
                                <span>${totalAmount + 100 + 15}.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid" id="running-bar" ref={runningBarRef}>
            <div className="row">
                <div className="col">
                    <div className="container">
                        <div className="row d-flex justify-content-end align-items-center p-4 gap-5">
                            <div className="col-auto">
                                <span id="placeorder-text">Total: ${totalAmount}.00</span>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-success" type="button">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Address</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <EditAddress onPlaceAddress={handlePlaceAddress}></EditAddress>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handlePlaceAddress} 
                        { ...(addressPlacementSuccessful && { 'data-bs-dismiss': 'modal' }) }
                    >Place Address</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}