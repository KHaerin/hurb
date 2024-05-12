import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cart.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Cart(){
    
    const navigate = useNavigate();
    const [tracks, setTracks] = useState([]);
    const [qtyField, setQtyField] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchCartProducts();
    }, []);

    useEffect(() => {
        calculateTotalAmount();
    }, [tracks]);


    const fetchCartProducts = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost/hurb/track_select.php?user_id=${user_id}`);
            const dataFetch = response.data;
            let total = 0;
            const processedData = dataFetch.map(item => {
                const totalAmount = item.product_qty * item.product_price;
                total += totalAmount;
                return { ...item, totalAmount };
            });
            setTracks(processedData.map(item => ({ ...item, selected: false })));
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const calculateTotalAmount = () => {
        const selectedItemsTotal = tracks
            .filter(track => track.selected) 
            .reduce((total, item) => total + (item.product_price * item.product_qty), 0); 
        setTotalAmount(selectedItemsTotal); 
    };

    const updateQuantity = async (track_id, newQuantity) => {
        try {
            const formData = new FormData();
            formData.append('track_id', track_id);
            formData.append('product_qty', newQuantity);
    
            const response = await axios.post("http://localhost/hurb/update_quantity.php", formData);
    
            // Update the quantity in the tracks array
            const updatedTracks = tracks.map(track => {
                if (track.track_id === track_id) {
                    return { ...track, product_qty: newQuantity }; // Update the quantity
                }
                return track;
            });
    
            // Update the state with the new tracks array
            setTracks(updatedTracks);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleQuantityChange = (track_id, newQuantity) => {
        const existingTrack = tracks.find(track => track.track_id === track_id);
        const currentStock = existingTrack.product_stock;
    
        if (newQuantity > currentStock) {
            toast.warning(`Exceed stocks, Stock left ${currentStock}`);
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

    const removeFromCart = async (track_id) => {
        try {
            const formData = new FormData();
            formData.append('track_id', track_id);

            const response = await axios.post("http://localhost/hurb/remove_copy.php", formData);
            fetchCartProducts();
            window.location.reload();
            toast(response.data);
        } catch (error) {
            toast.error(error);
        }
    };

 
    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;
        const updatedTracks = tracks.map(track => ({ ...track, selected: checked }));
        setTracks(updatedTracks);
        setSelectAll(checked);
        calculateTotalAmount();
    };

    const handleItemCheckboxChange = (track_id, selected) => {
        const updatedTracks = tracks.map(track => {
            if (track.track_id === track_id) {
                return { ...track, selected };
            }
            return track;
        });
        setTracks(updatedTracks);
        const allSelected = updatedTracks.every(track => track.selected);
        setSelectAll(allSelected);
        calculateTotalAmount(); 
    };

    const checkOut = () => {
        const selectedItems = tracks.filter(track => track.selected);
        if (selectedItems.length === 0) {
            toast.warning('Please select at least one item to proceed to checkout');
        } else {
            navigate('/checkout', {
                state: {
                    selectedItems,
                    totalAmount
                }
            });
        }
    };

    return(
        <>
            <div className="container" id="cartPage">
                <div className="row row-cols-1 mb-5">
                    <div className="col d-flex justify-content-center">
                        <h1>My Cart</h1>
                    </div>
                    <div className="col">
                        <div className="container">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="flexCheckDefault"
                                    checked={selectAll} 
                                    onChange={handleSelectAllChange} 
                                />
                                <label htmlFor="flexCheckDefault" className="form-check-label">ALL ITEMS</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className="col-auto d-flex justify-content-end" id="labelsCart">
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <hr className="border border-dark border-1 opacity-40" id="hrCart" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="noText">{tracks.length === 0 ? 'No Items In Your Cart' : ''}</p>
                        {tracks.map((track, index) => (
                                 <div className="container" key={track.track_id} id="cart-product-list">
                                 <div className="row">
                                     <div className="col m-3">
                                         <div className="form-check">
                                         <input 
                                                className="form-check-input product-check" 
                                                type="checkbox" 
                                                value={track.track_id} 
                                                id={`product-checkbox-${track.track_id}`} 
                                                checked={track.selected} 
                                                onChange={(e) => handleItemCheckboxChange(track.track_id, e.target.checked)} 
                                            />
                                         </div>
                                     </div>
                                 </div>
                                 <div className="row">
                                     <div className="col">
                                        <div className="product-image-container">
                                            <img src={`http://localhost/hurb/${track.product_img}`} alt="" id="cart-product-image"/>
                                        </div>
                                     </div>   
                                     <div className="col-lg-4 d-flex flex-column" id="cartDetails">
                                            <span className="mb-3" id="track-prod-name">{track.product_name}</span>
                                            <span id="sizetext">
                                            Size: {track.size}
                                            </span>
                                            <button className="btn btn-danger" id="removeButton" type="button" onClick={() => removeFromCart(track.track_id)}>Remove</button>
                                     </div>
                                     <div className="col">
                                        <div className="container-fluid">
                                            <div className="row justify-content-end">
                                            <div className="col-auto d-flex justify-content-end" id="labels-cart-display">
                                                <span>${track.product_price}.00</span>  
                                                <div className="input-group mb-3" id="qtybox">
                                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button"  onClick={() => decreaseQuantity(track.track_id, track.product_qty)} id="minusBtn-cart">-</button>
                                                    <input type="text" className="form-control" value={track.product_qty} onChange={(e) => setQtyField(e.target.value)} aria-label="Example text with two button addons" id="qtyField-cart"/>
                                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button" onClick={() => increaseQuantity(track.track_id, track.product_qty)} id="plusBtn-cart">+</button>
                                                </div>
                                            <span value={track.product_price * track.product_qty}  id="total-text">{track.product_price * track.product_qty}</span>
                                            </div>     
                                            </div>
                                        </div>
                                     </div>
                                 </div>
                             </div>
                        ))}
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end align-items-end" >
                        <div className="col-auto d-flex flex-column justify-content-end " >
                                <div className="row">
                                    <div className="col mb-3">
                                        <span id="orderTXT">Order Summary</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <span id="orderTXT-total" className="d-flex justify-content-end">
                                            {tracks
                                            .filter(track => track.selected)
                                            .reduce((total, item) => total + (item.product_price * item.product_qty), 0)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                         <button id="checkoutBtn" className="btn btn-dark" onClick={checkOut}>Checkout</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}