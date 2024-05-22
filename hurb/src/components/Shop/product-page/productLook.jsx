import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Black from '../../color-images/black.jpg';
import Red from '../../color-images/red.jpg';
import Grey from '../../color-images/grey.jpeg';
import Navy from '../../color-images/navy blue.jpg';
import White from '../../color-images/white.jpg';
import EStar from '../../icons/emptystar.png';
import { toast } from 'react-toastify';

import {CartContext} from '../../CartContext';

import './productLook.css';

export default function ProductLook() {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const [showDetails, setShowDetails] = useState(false);
    const [qtyField, setQtyField] = useState(1);
    const [productStock, setProductStock] = useState([]);
    const[availSizes, setAvailSize] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null); 

    const [product_id, setProdId] = useState('');
    const [product_name, setProdName] = useState('');
    const [product_size, setProdSize] = useState('');
    const [product_price, setProdPrice] = useState('');
    const [product_qty, setProdQty] = useState(qtyField);
    const [product_img_id, setImgID] = useState(null);
    const [selected_img, setSelectedImg] = useState('');
    const [selectedSizeID, setSelectedSizeID] = useState(null);
    const[colorImg, setColorImg] = useState([]);
    const[size_Qty, setSizeQty] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [firstImg, setFirstImg] = useState([]);

    useEffect(() => {
        fetchSizes(productId);
    }, [productId]);

    useEffect(() => {
        if (availSizes.length > 0) {
            const firstSize = availSizes[0];
            const allColorImages = availSizes.map(size => size.images).flat();
            setColorImg(allColorImages);
            setFirstImg(firstSize.images[0]);
            setProdSize(firstSize.size);
            setSizeQty(firstSize.quantity);
            setSelectedSize(firstSize.size);
            setSelectedColor(firstSize.color);
            setSelectedSizeID(firstSize.size_id);
    
            const defaultColorImage = firstSize.images.find(img => img.color_id === firstSize.color_id);
            if (defaultColorImage) {
                setSelectedImg(defaultColorImage.product_img);
                setSelectedColorId(firstImg.color_id);
                setImgID(firstImg.product_img_id);
            }
        }
    }, [availSizes]);

    useEffect(() => {
        const selectedSizeInfo = availSizes.find(size => size.size === selectedSize && size.color === selectedColor);
        if (selectedSizeInfo) {
            const defaultColorImage = selectedSizeInfo.images.find(img => img.color_id === selectedSizeInfo.color_id);
            if (defaultColorImage) {
                setSelectedImg(defaultColorImage.product_img);
                setSelectedColorId(defaultColorImage.color_id);
                setImgID(defaultColorImage.product_img_id);
            }
        }
    }, [selectedColor, selectedSize]);
    
    useEffect(() => {
        const selectedSizeInfo = availSizes.find(s => s.size === selectedSize && s.color === selectedColor);
        if (selectedSizeInfo) {
            setSizeQty(selectedSizeInfo.quantity);
        }
    }, [selectedColor, selectedSize, availSizes]);

   
    const handleSizeChange = (size, size_id) => {
        setProdSize(size);
        setSelectedSizeID(size_id);
        const selectedSizeInfo = availSizes.find(s => s.size === size && s.color === selectedColor);
        if (selectedSizeInfo) {
            setSizeQty(selectedSizeInfo.quantity);
            setSelectedSize(size);
            setQtyField(1); // Reset quantity field to 1 when size changes
        }
    };

    const [user, setUser] = useState('');
    const [productQty, setProductQty] = useState('');
    const [cartProd, setCartProd] = useState([]);

    useEffect(() => {
        setUser(localStorage.getItem('userId'))
       
    })

    useEffect(() => {
        fetchCartProducts();
    }, [user, size_Qty]);
    
    // useEffect(() => {
    //     console.log('cart: ', cartProd);
    //     console.log('test qty: ', productQty);
    //     console.log('userid : ', user);
    // }, [cartProd, productQty]); // Make sure to include cartProd and productQty in the dependency array
    
    const fetchCartProducts = async () => {
        try {
            const response = await axios.get(`http://localhost/hurb/track_select.php?user_id=${user}`);
            const cartData = response.data;
            setCartProd(cartData);
    
            // Map through the cart data to extract product quantities
            const productQuantities = cartData.map(item => item.product_qty);
            setProductQty(productQuantities);
        } catch (error) {
            console.error('Error fetching cart products: ', error);
        }
    }

    const fetchSizes = async(productId) => {
        try {
            const response = await axios.get(`http://localhost/hurb/selectSizes.php?product_id=${productId}`);
            setAvailSize(response.data);
            setProduct(response.data);

            const stockFetch = response.data[0];
            const qtyFetch = stockFetch.product_stock;
            const idFetch = stockFetch.product_id;
            const nameFetch = stockFetch.product_name;
            const priceFetch = stockFetch.product_price;
    
            setShowDetails(stockFetch.product_details);
            setProdId(idFetch);
            setProdName(nameFetch);
            setProdPrice(priceFetch);
            setProductStock(qtyFetch);
            setImgID()
     
        } catch (error) {
            console.error('Error fetching sizes: ', error);
        }
    }

    
    const handleAddQtyField = () => {
        const currentQty = parseInt(qtyField);
        if (!isNaN(currentQty) && currentQty < size_Qty) {
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

    const { toggleReloadContact } = useContext(CartContext);

     const handleAddCart = () => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if(parseInt(qtyField) > size_Qty  || (parseInt(qtyField) + parseInt(productQty)) > size_Qty){
          
            toast.warning(`Exceed Stock, Stock Left: ${size_Qty}`);
            setQtyField(1);
            return;
        }
        if(storedLoginStatus){
            setProdQty(qtyField);
            const url = "http://localhost/hurb/track_bought.php";
            const getID = localStorage.getItem('userId');
            let fData = new FormData();
            fData.append('product_id', product_id);
            fData.append('user_id', getID);
            fData.append('size_id', selectedSizeID);
            fData.append('color_id', selectedColorId);
            fData.append('product_qty', product_qty);
            fData.append('product_img_id', product_img_id);
    
            axios.post(url, fData)
            .then(response=>{
                toast.success(response.data);
                setQtyField(1);     
                fetchCartProducts();
                toggleReloadContact(true);
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

    const handleColorChange = (color, colorId) => {
        setSelectedColor(color); // Update selected color
        setSelectedColorId(colorId); // Update selected color's ID
    
        // Find the default color image for the new color
        const defaultColorImage = availSizes.find(size => size.color === color)?.images.find(img => img.color_id === colorId);
        
        if (defaultColorImage) {
            setSelectedImg(defaultColorImage.product_img); // Update selected image
            setImgID(defaultColorImage.product_img_id); // Update selected image ID
        }
    
        // Update the selected size ID based on the new selected color
        const currentSizeInfo = availSizes.find(size => size.size === selectedSize && size.color === color);
        if (currentSizeInfo) {
            setSelectedSizeID(currentSizeInfo.size_id);
            setQtyField(1);
        } else {
            // If the selected size for the current color is not available, update to the first available size ID for the new color
            const filteredSizes = availSizes.filter(size => size.color === color);
            if (filteredSizes.length > 0) {
                setSelectedSizeID(filteredSizes[0].size_id);
            }
        }
    };

    const colorBgMap = {
        Black: "black",
        Red: "red",
        Grey: "grey",
        Blue: "blue",
        White: "white",
        Pink: 'pink',
        Purple: 'purple',
        Green: 'green',
        Yellow: 'yellow',
        Orange: 'orange'
    };

    const uniqueColors = [...new Set(availSizes.map(size => size.color))];
    const filteredSizes = availSizes.filter(size => size.color === selectedColor);

    // useEffect(()=>{
    //     // console.log('colors: ', uniqueColors);
    //     console.log('selected color: ', selectedColor);
    //     console.log('colorid: ',selectedColorId)
    //     // console.log('product: ', product);
    //     // console.log('img id: ',product_img_id);
    // })

    return (
          <div className="container" id="product-look">
            <div className="row">
                <div className="col">
                {product.slice(0, 1).map((product, index) => (
                    <div className="container" key={product.product_id} >
                        <div className="row row-cols-2">
                            <div className="col">
                                <div className="container d-flex flex-column justify-content-center align-items-center" id="product-color-container">
                                    <div className="col mb-4">
                                        <div className="product-image-container d-flex justify-content-center align-items-center">              
                                            <img 
                                                    src={`http://localhost/hurb/${selected_img}`} 
                                                    alt="" 
                                                    id="product_image"
                                                />
                                        </div>
                                    </div>
                                    <div className="col" id="color-container">
                                        <span>Color:</span>
                                        <div className="col-auto d-flex gap-3" >
                                            {uniqueColors.map((color, index) => (
                                                <div key={index}>
                                                    <input       
                                                        type="radio" 
                                                        className="btn-check" 
                                                        name="options-base" 
                                                        id={`option-${color}`} 
                                                        autoComplete="off"
                                                        checked={selectedColor === color}
                                                        onChange={() => handleColorChange(color, availSizes.find(size => size.color === color)?.color_id)}
                                                        key={color} // Add key attribute here
                                                    />
                                                    <label htmlFor={`option-${color}`} className="btn color-radio" 
                                                            style={{ 
                                                                backgroundColor: colorBgMap[color],
                                                                border: selectedColor === color ? '3px solid #A6A6A6' : ''
                                                            }}
                                                    ></label>    
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
                                        <div className="col-lg-12 mb-2">
                                            <span id="details-title">Size</span>
                                        </div>
                                        <div className="col d-flex flex-1 gap-3">
                                            {filteredSizes.map((size, index) => (
                                                <div key={size.product_scq_id} className="d-flex">
                                                    <input 
                                                        type="radio" 
                                                        className="btn-check" 
                                                        name="options-size" 
                                                        id={size.size} 
                                                        autoComplete="off" 
                                                        value={size.size} 
                                                        onChange={() => handleSizeChange(size.size, size.size_id)} 
                                                        checked={selectedSize === size.size}
                                                    />
                                                    <label 
                                                        className="btn btn-outline-dark d-flex align-items-center" 
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
        </div>
    );
}
