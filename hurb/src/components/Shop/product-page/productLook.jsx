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
import { ToastContainer, toast } from 'react-toastify';

import './productLook.css';

export default function ProductLook() {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const [showDetails, setShowDetails] = useState(false);
    const [qtyField, setQtyField] = useState(1);
    const [productStock, setProductStock] = useState([]);

    const [product_id, setProdId] = useState('');
    const [product_name, setProdName] = useState('');
    const [product_size, setProdSize] = useState('xs');
    const [product_price, setProdPrice] = useState('');
    const [product_qty, setProdQty] = useState(qtyField);
    const [product_img, setProdImg] = useState(null);

    const history = useNavigate();

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

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
                                        </div>
                                    </div>
                                    <div className="col" id="color-container">
                                            <div className="container d-flex flex-column justify-content-center">
                                            <div className="col mb-3 justify-content-center">
                                                <span>Color: Black </span>
                                            </div>
                                            <div className="col d-flex gap-3">
                                                <input type="radio" className="btn-check" name="options-base" id="option1" autoComplete="off" defaultChecked/>
                                                <label htmlFor="option1" className="btn color-radio"><img src={Black} alt="" id="color-radio-img"/></label>

                                                <input type="radio" className="btn-check" name="options-base" id="option2" autoComplete="off"/>
                                                <label htmlFor="option2" className="btn color-radio"><img src={White} alt="" id="color-radio-img" /></label>

                                                <input type="radio" className="btn-check" name="options-base" id="option3" autoComplete="off"/>
                                                <label htmlFor="option3" className="btn color-radio"><img src={Red} alt="" id="color-radio-img" /></label>

                                                <input type="radio" className="btn-check" name="options-base" id="option4" autoComplete="off"/>
                                                <label htmlFor="option4" className="btn color-radio"><img src={Navy} alt="" id="color-radio-img" /></label>

                                                <input type="radio" className="btn-check " name="options-base" id="option5" autoComplete="off"/>
                                                <label htmlFor="option5" className="btn color-radio"><img src={Grey} alt="" id="color-radio-img" /></label>
                                            </div>
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
                                            <span>Stock Available: {productStock}</span>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 mb-4">
                                        <div className="col mb-2">
                                            <span id="details-title">Size</span>
                                        </div>
                                        <div className="col-lg-10 col-md-8">
                                            <input type="radio" className="btn-check" name="options-base" id="xs" autoComplete="off" value="xs" onChange={(e) => setProdSize(e.target.value)} defaultChecked={product_size === 'xs'}/>
                                            <label className="btn btn-outline-dark" htmlFor="xs" id="xs">X Small</label>

                                            <input type="radio" className="btn-check" name="options-base" id="sm" autoComplete="off" value="sm"  onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="sm" id="sm">Small</label>

                                            <input type="radio" className="btn-check" name="options-base" id="md" autoComplete="off" value="md"  onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="md" id="md">Medium</label>

                                            <input type="radio" className="btn-check" name="options-base" id="lg" autoComplete="off" value="lg"  onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="lg" id="lg">Large</label>

                                            <input type="radio" className="btn-check" name="options-base" id="xlg" autoComplete="off" value="xlg"   onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="xlg" id="xlg">X Large</label>

                                            <input type="radio" className="btn-check" name="options-base" id="xxlg" autoComplete="off" value="xxlg"  onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="xxlg" id="xxlg">XX Large</label>

                                            <input type="radio" className="btn-check" name="options-base" id="xxxlg" autoComplete="off" value="xxxlg"   onChange={(e) => setProdSize(e.target.value)}/>
                                            <label className="btn btn-outline-dark" htmlFor="xxxlg" id="xxxlg">XXX Large</label>
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
