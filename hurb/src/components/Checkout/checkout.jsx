import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faWallet, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Image, InputGroup, Form, Modal} from 'react-bootstrap';
import EditAddress from './EditAdd';
import 'bootstrap/dist/js/bootstrap.min.js';
import Paypal from './Paypal';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function checkout(){

    const location = useLocation();
    const navigate = useNavigate();
    const[tracks, setTrack] = useState([]);
    const[qtyField, setQtyField] = useState('');
    const runningBarRef = useRef(null);
    const[totalAmount, setTotalAmount] = useState('');
    const[subTotal, setSubTotal] = useState('');
    const[serviceFee, setServiceFee] = useState(15);
    const[shippingFee, setShipFee] = useState('');
    const[estimatedArrival, setEstimatedArrival] = useState('');
    const[trackProduct, setTrackProduct] = useState('');
    const[payed, setPayed] = useState('');
    const[isPayed, setIsPayed] = useState(false);

    useEffect(() => {
        if (location.state && location.state.selectedItems) {
            const selectedItems = location.state.selectedItems;
            const totalAmount = location.state.totalAmount;
            setTrack(selectedItems);
            setSubTotal(totalAmount);
            setTotalAmount(totalAmount);
        } else {
            navigate('/cart');
        }

        calculateEstimatedArrival();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.state, navigate]);


    const[todayDate, setToday] = useState('');

        useEffect(() => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            setToday(formattedDate);
        }, []);

    const calculateEstimatedArrival = () => {
        const today = new Date();
        const estimatedArrivalDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); 
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedToday = today.toLocaleDateString(undefined, options);
        const formattedEstimatedArrival = estimatedArrivalDate.toLocaleDateString(undefined, options);
    
        const arrivalRange = `${formattedToday} - ${formattedEstimatedArrival}`;
        setEstimatedArrival(arrivalRange);
    };

    const updateQuantity = async (track_id, newQuantity) => {
        try {
            const formData = new FormData();
            formData.append('track_id', track_id);
            formData.append('product_qty', newQuantity);
    
            const response = await axios.post("http://localhost/hurb/update_quantity.php", formData);
            
            setTrack(prevTracks => {
                return prevTracks.map(track => {
                    if (track.track_id === track_id) {
                        return { ...track, product_qty: newQuantity };
                    } else {
                        return track;
                    }
                });
            });
            
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const handleQuantityChange = (track_id, newQuantity) => {
        const existingTrack = tracks.find(track => track.track_id === track_id);
        const currentStock = existingTrack.product_stock;
    
        if (newQuantity > currentStock) {
            toast.warning(`Exceed Stock, Stock Left ${currentStock}`);
        } else {
            updateQuantity(track_id, newQuantity);

            calculateSubTotal();
            calculateTotalAmount();
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
    
    const calculateSubTotal = () => {
        const subtotal = tracks.reduce((total, item) => total + (item.product_price * item.product_qty), 0);
        setSubTotal(subtotal);
    };
    
    const calculateTotalAmount = () => {
        const total = subTotal + serviceFee + shippingFee;
        setTotalAmount(total);
    };
    
    useEffect(() => {
        calculateSubTotal();
        calculateTotalAmount();
    }, [tracks, shippingFee]);

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

    const[addressBook, setAddressBook] = useState([]);

    useEffect(() => {
        const getAddressBook = async () => {
            try{
                const userID = localStorage.getItem('userId');
                const url = await axios.get(`http://localhost/hurb/AddressBook/getAddress.php?user_id=${userID}`);
                if (Array.isArray(url.data) && url.data.length > 0) {
                    setAddressData([url.data[0]]);
                    setAddressBook(url.data[0]);
                } else {
                    setAddressBook([]);
                    console.log('failed sa address');
                }
            }catch(error){
                console.error(error);

            }
        }
        getAddressBook();

    }, [])

    const[addressData, setAddressData] = useState([]);
    const[local, setLocal] = useState(false);
    const[noItems, setNoItems] = useState('');

    const [showPaypal, setShowPaypal] = useState(false);
 
    const handleOrder = () => {
        if(addressData.length === 0){
           toast.warning('Please set your address');
            return;
        }
        const orderUrl = "http://localhost/hurb/CustomerOrder/customerOrder.php";
        const user_id = localStorage.getItem('userId');
        console.log(addressData);

        let orderData = new FormData();
        orderData.append('user_id', user_id);
        orderData.append('payed_id', payed.id);
        orderData.append('payed_status', payed.status);
        orderData.append('addBook_id', addressBook.addBook_id);
        tracks.forEach(product => {
            orderData.append('product_id[]', product.product_id);
            orderData.append('quantity[]', product.product_qty);
            orderData.append('size[]', product.product_size);
            orderData.append('product_price[]', product.product_price);
        });
        orderData.append('totalPayable', totalAmount);
        orderData.append('date_bought', todayDate);
        orderData.append('deliver_status', 'ship');
        console.log('today date: ', todayDate);

        axios.post(orderUrl, orderData)
        .then(response=>{
            toast.success(response.data);

            tracks.forEach(track => {
                removeProduct(track.track_id);
            });
            window.location.href="/shop";
        })
        .catch(error=>alert(error));

    }

    const removeProduct = async (track_id) => {
        try {
            const formData = new FormData();
            formData.append('track_id', track_id);
    
            const response = await axios.post("http://localhost/hurb/remove_product.php", formData);
            fetchCartProducts();
            toast(response.data);
        } catch (error) {
            toast.warning(error);
        }
    };
    

    const handleAddressData = (data) => {
        setAddressData([data]);
        if(data.province === 'Cebu'){
            setLocal(true);
        }
    }

    useEffect(() => {
        if(local){
            setShipFee(80);
        }else{
            setShipFee(120);
        }
    }, [addressData]);

    useEffect(() => {
        const total = subTotal + shippingFee + serviceFee;
        setTotalAmount(total);
        setNoItems(tracks.length);
    }, [subTotal, shippingFee, serviceFee]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash On Delivery');

    
    const handleCheckboxChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const [showPay, setShowPay] = useState(false);
    const handleClosePay = () => setShowPay(false);
    const handleOpenPay = () => setShowPay(true);

    useEffect(() => {
        if (isPayed && payed) {
            handleOrder();
        }
    }, [isPayed, payed]);

    const handlePaypalOrder = (orderData) => {
        setPayed(orderData);
        setIsPayed(true);
        if(orderData.status === "COMPLETED"){
            toast.success('Payment complete');
        }else{
            toast.error('Payment pending...');
        }
    };

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <hr className="border border-dark border-1 opacity-75"/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="mb-3">
                    <span id="checkout-labels">Shipping Address</span>
                </Col>
                <Col lg={8} className="mb-5">
                    <Container id={addressData.length > 0 ? 'ship-address-container' : ''}>
                        <Row>
                            {addressData.map((Book, index) => (
                                <Col className="p-4" key={Book.bookID || Book.addBook_id}>                
                                    <div className="contain">
                                        <span>
                                            {Book.rec_name || Book.recipient_name}
                                        </span>
                                    </div>
                                    <div className="contain">
                                        <span>
                                            {Book.mobile_number}
                                        </span>
                                    </div>
                                    <div className="contain">
                                        <span>
                                            {Book.myAddress || Book.address}
                                        </span>
                                    </div>
                                </Col>
                            ))}             
                            <Col className="d-flex justify-content-end align-items-center">
                                <Button variant="dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="AddressBtn">Edit Address</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={12}>
                    <span id="checkout-labels">Order Details</span>
                </Col>
                <Col className="d-flex col-auto">
                    {tracks.map((track, index) => (
                        <Container className="d-flex" key={track.track_id}>
                            <Row>
                                <Col className="d-flex flex-column justify-content-center align-items-center">
                                    <Image src={`http://localhost/hurb/${track.product_img}`} alt="" id="checkout-product-img"/>
                                    <span>{track.product_size.toUpperCase()}</span>
                                    <span id="price-text">₱{track.product_price}.00</span>
                                    <InputGroup className="input-group mb-3 d-flex justify-content-center align-items-center" id="qtybox">
                                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center" type="button"  onClick={() => decreaseQuantity(track.track_id, track.product_qty)} id="minusBtn-cart">-</Button>
                                        <Form.Control type="text" value={track.product_qty} readOnly aria-label="Example text with two button addons" id="qtyField-cart"/>
                                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center" type="button" onClick={() => increaseQuantity(track.track_id, track.product_qty)} id="plusBtn-cart">+</Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={12} className="mb-2">
                    <span id="checkout-labels">Shipping Options</span>
                </Col>
                <Col lg={8}>
                    <Container className="p-4" id="ship-address-container">
                        <Row>
                            <Col xs={12} className="d-flex gap-3 mb-4">
                            <FontAwesomeIcon icon={faTruck} id="shipping-icon" />
                            <span>Standard Shipping</span>
                            </Col>
                            <Col>
                                <span>{`( Arrives between ${estimatedArrival} )`}</span>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs={12} className="mb-2">
                    <span id="checkout-labels">Payment Method</span>
                </Col>
                <Col className="mb-2">
                    <Form>
                        {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 d-flex flex-column">
                            <Form.Check 
                            inline 
                            label=
                            {
                            <Form.Check aria-label="flexRadioDefault" className="form-check-label mb-4" htmlFor="flexRadioDefault1">
                                <FontAwesomeIcon icon={faHandHoldingDollar} id="payment-icons" /> 
                                <span id="payment-text">Cash On Delivery</span>
                             </Form.Check>
                             }
                             name="flexRadioDefault"
                             type={type}
                             id={`inline-${type}-1`}
                             checked={selectedPaymentMethod === 'Cash On Delivery'} 
                             onChange={() => handleCheckboxChange('Cash On Delivery')}
                             />             
                             <Form.Check 
                            inline 
                            label=
                            {
                                <Form.Check aria-label="flexRadioDefault" className="form-check-label mb-4" htmlFor="flexRadioDefault1">
                                      <FontAwesomeIcon icon={faWallet} id="payment-icons"/>
                                      <span id="payment-text">Paypal</span>
                                </Form.Check>
                             }
                             name="flexRadioDefault"
                             type={type}
                             id={`inline-${type}-1`}
                             checked={selectedPaymentMethod === 'Paypal'} 
                             onChange={() => handleCheckboxChange('Paypal')} 
                             />  

                            <Form.Check 
                            inline 
                            label=
                            {
                                <Form.Check aria-label="flexRadioDefault" className="form-check-label mb-4" htmlFor="flexRadioDefault1">
                                      <FontAwesomeIcon icon={faCreditCard} id="payment-icons"/>
                                      <span id="payment-text">Credit / Debit Card</span>
                                </Form.Check>
                             }
                             name="flexRadioDefault"
                             type={type}
                             id={`inline-${type}-1`}
                             checked={selectedPaymentMethod === 'Card'} 
                             onChange={() => handleCheckboxChange('Card')} 
                             /> 

                              <Form.Check 
                            inline 
                            label=
                            {
                                <Form.Check aria-label="flexRadioDefault" className="form-check-label mb-4" htmlFor="flexRadioDefault1">
                                <FontAwesomeIcon icon={faWallet} id="payment-icons"/>  
                                <span id="payment-text">Gcash (Soon to be available)</span>
                                </Form.Check>
                             }
                             name="flexRadioDefault"
                             type={type}
                             id={`inline-${type}-1`} 
                             disabled
                             />   
                               
                         </div>
                        ))}
                    </Form>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={12}>
                    <span id="checkout-labels">Voucher Code</span>
                </Col>
                <Col className="col-auto">
                    <InputGroup className="mb-3">
                        <Form.Control type="text" id="voucherInput" placeholder="Enter Voucher Code" aria-label="Enter Voucher Code" aria-describedby="button-addon2"/>
                        <Button variant="secondary" id="button-addon2">Apply</Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-5" id="checkout-details">
                <Col xs={12} lg={12}>
                    <Container>
                        <Row>
                            <Col>
                                <span id="checkout-labels-1">Subtotal <span id="checkout-label-2">({noItems} item{noItems > 1 ? 's' : ''})</span></span>
                            </Col>
                            <Col>
                                <span>₱{subTotal}.00</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span id="checkout-labels-1">Service and Insurance Fee </span>
                            </Col>
                            <Col>
                               <span>₱{serviceFee}.00</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span id="checkout-labels-1">Store Discount </span>
                            </Col>
                            <Col>
                                <span>₱0.00</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span id="checkout-labels-1">Shipping Fee Subtotal</span>
                            </Col>
                            <Col>
                                <span>₱{shippingFee}.00</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr className="border border-dark border-1 opacity-75" id="totalHr"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span id="checkout-labels-1">Total</span>
                            </Col>
                            <Col>
                                <span id="total">₱{subTotal + serviceFee + shippingFee}.00</span>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        <Container fluid id="running-bar" ref={runningBarRef}>
            <Row>
                <Col>
                    <Container>
                        <Row className="d-flex justify-content-end align-items-center p-4 gap-5">
                            <Col className="col-auto">
                                <span id="placeorder-text">Total: ₱{totalAmount}.00</span>
                            </Col>
                            <Col className="col-auto">
                                <Button variant="success" onClick={selectedPaymentMethod === 'Cash On Delivery' ? handleOrder : handleOpenPay} type="button">Place Order</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        <Modal show={showPay} onHide={handleClosePay}>
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Paypal handlePaypalOrder={handlePaypalOrder} totalAmount={totalAmount} />
            </Modal.Body>
        </Modal>
        <EditAddress addressData={handleAddressData}></EditAddress>
        </>
    )
}