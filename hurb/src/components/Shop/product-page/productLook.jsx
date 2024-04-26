import React, { useState, useEffect, } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Black from '../../color-images/black.jpg';
import Red from '../../color-images/red.jpg';
import Grey from '../../color-images/grey.jpeg';
import Navy from '../../color-images/navy blue.jpg';
import White from '../../color-images/white.jpg';
import Star from '../../icons/star.png/';
import EStar from '../../icons/emptystar.png';
import RedShirt from '../../icons/shirt-test/b5.png'
import BlackShirt from '../../icons/shirt-test/b6.png'
import WhiteShirt from '../../icons/shirt-test/b7.png'
import { ToastContainer, toast } from 'react-toastify';

import './productLook.css';

export default function ProductLook() {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const [showDetails, setShowDetails] = useState(false);
    const [qtyField, setQtyField] = useState(1);
    const [productStock, setProductStock] = useState([]);
    const[availSizes, setAvailSize] = useState([]);

    const [product_id, setProdId] = useState('');
    const [product_name, setProdName] = useState('');
    const [product_size, setProdSize] = useState('');
    const [product_price, setProdPrice] = useState('');
    const [product_qty, setProdQty] = useState(qtyField);
    const [product_img, setProdImg] = useState(null);
    const[colors, setColors] = useState(``);
    const[size_Qty, setSizeQty] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    

    const history = useNavigate();

    useEffect(() => {
        fetchProduct(productId);
        fetchSizes(productId);
    }, [productId]);

    useEffect(() => {
        if (availSizes.length > 0) {
            const firstSize = availSizes[0];
            setProdSize(firstSize.size);
            setSizeQty(firstSize.quantity);
            setSelectedSize(firstSize.size);
        }
    }, [availSizes]);

    // Function to handle size selection
    const handleSizeChange = (size) => {
        setProdSize(size);
        const selectedSizeInfo = availSizes.find(s => s.size === size);
        if (selectedSizeInfo) {
            setSizeQty(selectedSizeInfo.quantity);
            setSelectedSize(size);
        }
    };

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost/hurb/products.php?product_id=${productId}`);
            const stockFetch = response.data[0];
            const qtyFetch = stockFetch.product_stock;
            const imgFetch = stockFetch.product_img;
            const idFetch = stockFetch.product_id;
            const nameFetch = stockFetch.product_name;
            const priceFetch = stockFetch.product_price;

            setShowDetails(stockFetch.product_details);
            setProdId(idFetch);
            setProdName(nameFetch);
            setProdPrice(priceFetch);
            setProdImg(imgFetch);
            setProductStock(qtyFetch);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const fetchSizes = async(productId) => {
        try {
            const response = await axios.get(`http://localhost/hurb/selectSizes.php?product_id=${productId}`);
            console.log(response.data); 
            setAvailSize(response.data);
        } catch (error) {
            console.error('Error fetching sizes: ', error);
        }
    }

    
    const handleAddQtyField = () => {
        const currentQty = parseInt(qtyField);
        if (!isNaN(currentQty) && currentQty < productStock) {
            setQtyField(currentQty + 1);
            setProdQty(currentQty + 1);
        } else {
            toast.warning('Cannot add more quantity, exceeds stock!');
        }
    }

    const handleSubQtyField = () => {
        if(qtyField > 1){
            setQtyField(qtyField - 1);
            setProdQty(qtyField - 1);
        }
    }


     const handleAddCart = () => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if(parseInt(qtyField) > productStock){
            toast.warning(`Exceed Stock, Stock Left: ${productStock}`);
            return;
        }
        if(storedLoginStatus){
            setProdQty(qtyField);
            const url = "http://localhost/hurb/track_bought.php";
            const getID = localStorage.getItem('userId');
            let fData = new FormData();
            fData.append('product_id', product_id);
            fData.append('user_id', getID);
            fData.append('product_name', product_name);
            fData.append('product_size', product_size);
            fData.append('product_price', product_price)
            fData.append('product_qty', product_qty);
            fData.append('product_img', product_img);
    
            axios.post(url, fData)
            .then(response=>{
                toast.success(response.data);
                window.location.href="/shop/cart";
            })
            .catch(error=>alert(error));
        }else{
            const errorToastId = toast.error("Please login first !", {
                onClose: () => {
                    window.location.href = "/login";
                }
            });
        }
    }

    const ColorChange = (color) => {
        setColors(color);
    }

    return (
        <div className="container" id="product-look">
            <div className="row">
                <div className="col">
                {product.map((product, index) => (
                    <div className="container" key={product.product_id} >
                        <div className="row row-cols-2">
                            <div className="col" >
                                <div className="container d-flex flex-column justify-content-center align-items-center" id="product-color-container">
                                    <div className="col mb-4">
                                        <div className="product-image-container d-flex justify-content-center align-items-center">
                                            <img src={`http://localhost/hurb/${product.product_img}`} name="product_img"alt="" id="product_image"/>
                                            {/* {colors === 'Black' && 
                                                <img src={`http://localhost/hurb/${product.product_img}`} name="product_img"alt="" id="product_image"/>
                                            }
                                            {colors === 'Red' && 
                                                <img src={RedShirt} name="product_img"alt="" id="product_image"/>
                                            }
                                            {colors === 'White' && 
                                                 <img src={WhiteShirt} name="product_img"alt="" id="product_image"/>
                                            } */}
                                        </div>
                                    </div>
                                    <div className="col" id="color-container">
                                     <span>Color:</span>
                                     <div className="container d-flex  justify-content-center" >
                                     {availSizes.map((availColors, index) => (
                                        <div className="col d-flex gap-3" key={availColors.product_scq_id}>
                                            <input type="radio" className="btn-check" name="options-base" id={`option${availColors.product_scq_id}`} autoComplete="off"/>
                                            <label htmlFor={`option${availColors.product_scq_id}`} onClick={() => { ColorChange(availColors.color)}} className="btn color-radio">
                                                <img src={Black} alt="" id="color-radio-img"/>{availColors.color}
                                            </label>
                                        </div>
                                    ))} 
                                     </div>      
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container">
                                    <div className="row row-cols-1 mb-5">
                                        <div className="col d-flex mb-2">
                                         <span value={product_name} name="product_name" id="productName-text"  onChange={(e) => setProdName(e.target.value)}>{product.product_name}</span>
                                        </div>
                                        <div className="col d-flex gap-1 mb-5">
                                            <img src={EStar} alt=""  id="star"  />
                                            <img src={EStar} alt=""  id="star"  />
                                            <img src={EStar} alt=""  id="star"  />
                                            <img src={EStar} alt=""  id="star"  />
                                            <img src={EStar} alt=""  id="star"  />
                                        </div>
                                        <div className="col">
                                            <span id="priceTXT" value={product_price}>${product.product_price}.00</span>
                                        </div>
                                        <div className="col">
                                            <span>Stock Available: {size_Qty}</span>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 mb-4">
                                        <div className="col mb-2">
                                            <span id="details-title">Size</span>
                                        </div>
                                        <div className="col-lg-10 col-md-8 d-flex gap-3">
                                        {availSizes.map((size, index) => (
                                                <div key={size.product_scq_id}>
                                                    <input 
                                                        type="radio" 
                                                        className="btn-check" 
                                                        name="options-size" 
                                                        id={size.size} 
                                                        autoComplete="off" 
                                                        value={size.size} 
                                                        onChange={() => handleSizeChange(size.size)} 
                                                        checked={selectedSize === size.size}
                                                    />
                                                    <label 
                                                        className="btn btn-outline-dark" 
                                                        htmlFor={size.size} 
                                                        id={size.size}
                                                    >
                                                        {size.size === "XS" && 'X Small'}
                                                        {size.size === "S" && 'Small'}
                                                        {size.size === "M" && 'Medium'}
                                                        {size.size === "L" && 'Large'}
                                                        {size.size === "XL" && 'X Large'}
                                                        {size.size === "XXL" && 'XX Large'}
                                                        {size.size === "XXXL" && 'XXX Large'}
                                                    </label>    
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 mb-5">
                                        <div className="col mb-2">
                                            <span id="details-title">Quantity</span>
                                        </div>
                                        <div className="col-lg-12  d-flex flex-lg-row flex-column gap-5">
                                            <div className="input-group mb-3" id="qty-container">
                                                <button className="btn btn-outline-secondary" type="button" onClick={handleSubQtyField} id="minusBtn">-</button>
                                                <input type="text" className="form-control" value={qtyField || ''} 
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    if (newValue === '' || newValue === '1' || !isNaN(newValue)) {
                                                        setQtyField(newValue);
                                                        setProdQty(newValue);
                                                    }
                                                }}
                                                
                                                aria-label="Example text with two button addons" id="qtyField"/>
                                                <button className="btn btn-outline-secondary" type="button" onClick={handleAddQtyField}id="addBtn">+</button>
                                            </div>
                                            <div className="btn btn-dark d-flex justify-content-center align-items-center" onClick={handleAddCart} id="addToCartBtn">ADD TO CART</div>      
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col mb-5">
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button 
                                                            className={`accordion-button collapsed ${showDetails ? 'open' : ''}`} 
                                                            id="detailsBtn" 
                                                            type="button" 
                                                            data-bs-toggle="collapse" 
                                                            data-bs-target="#flush-collapseOne" 
                                                            aria-expanded={showDetails ? "true" : "false"} 
                                                            aria-controls="flush-collapseOne"
                                                        >
                                                            Details
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" id="flush-collapseOne" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">{showDetails}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <ToastContainer position="top-center" limit={1}/>
        </div>
    );
}
