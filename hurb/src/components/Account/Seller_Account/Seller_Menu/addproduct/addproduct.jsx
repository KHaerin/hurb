import React, { useState, useEffect } from 'react';
import BottomDrop from './bottomDrop';
import TopDrop from './topDrop';
import axios from 'axios';
import '../Products.css';
import ColorsDrop from './colorsDrop';

export default function addproduct(){

    const[product_name, setProductName] = useState('');
    const[product_sex, setProductSex] = useState('');
    const[product_category, setProductCategory] = useState('');
    const[product_sub_category, setProductSubCategory] = useState('');
    const[product_details, setProductDetails] = useState('');
    const[colors, setColors] = useState('');
    const[product_price, setProductPrice] = useState('');
    const[product_stock, setProductStock] = useState('');
    const[product_img, setProductImg] = useState('');
    const[seller_id, setSellerID] = useState('');
    const[sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState([]);
    const [sizeData, setSizeData] = useState({});

    const handleSizeChange = (size) => {
        
        setSelectedSizes(prevSelectedSizes => {
            if (prevSelectedSizes.includes(size)) {
            
                return prevSelectedSizes.filter(s => s !== size);
            } else {
                return [...prevSelectedSizes, size];
            }
        });
    
        setSizeData(prevSizeData => {
            if (prevSizeData[size]) {
                const { [size]: removedSize, ...newSizeData } = prevSizeData;
                return newSizeData;
            } else {
                return { ...prevSizeData, [size]: { quantity: '', color: '' } };
            }
        });
    };

    const handleQuantityChange = (size, quantity) => {
        setSizeData(prevSizeData => ({
            ...prevSizeData,
            [size]: { ...prevSizeData[size], quantity }
        }));
    };

    const handleColorChange = (size, color) => {
        setSizeData(prevSizeData => ({
            ...prevSizeData,
            [size]: { ...prevSizeData[size], color }
        }));
    };

    const getSellerID = async () => {
        try{
            const getUserId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost/hurb/seller/get_seller.php?user_id=${getUserId}`);
            const dataFetch = response.data;
            const getSellerID = dataFetch.seller_id;
            setSellerID(getSellerID);
        }catch(error){
            console.log('Error fetching data:', error);
        }
    }
    
    useEffect(() => {
        console.log('sizeData: ', sizeData);
    })

    useEffect(() => {
        getSellerID();
    }, []);

    const handleSubmit = () => {
        if(product_name.length === 0){
            alert('Product name empty!');
        } else if(product_details.length === 0){
            alert('Product details empty!'); 
        } else if(product_price.length === 0){
            alert('Product price empty!');
        } else if(!product_img){
            alert('Please provide an image for your product!');
        } else {

            const selectedSizesWithChecked = Object.keys(sizeData).map(size => size); // Get selected sizes from sizeData
        const quantitiesToSend = Object.keys(sizeData).map(size => sizeData[size].quantity || 0); // Get quantities from sizeData
        const colorsToSend = Object.keys(sizeData).map(size => sizeData[size].color); // Get colors from sizeData

        const selectedColorsWithChecked = colorsToSend.filter(color => color !== 'DEFAULT');

        if (selectedSizesWithChecked.length === 0) {
            alert('Please select at least one size!');
        } else if (selectedColorsWithChecked.length === 0) {
            alert('Please select at least one color!');
        } else {
                const url = "http://localhost/hurb/add_product.php";

                const fData = new FormData();
                fData.append('seller_id', seller_id);
                fData.append('product_name', product_name);
                fData.append('product_sex', product_sex);
                fData.append('product_category', product_category);
                fData.append('product_sub_category', product_sub_category);
                fData.append('product_details', product_details);
                fData.append('product_price', product_price);
                fData.append('product_img', product_img);
                fData.append('product_stock', product_stock);
                fData.append('selected_sizes', JSON.stringify(selectedSizesWithChecked));
                fData.append('selected_quantities', JSON.stringify(quantitiesToSend));
                fData.append('selected_colors', JSON.stringify(selectedColorsWithChecked));

                console.log('selected size', selectedSizesWithChecked);
                console.log('selected qty', quantitiesToSend);
                console.log('selected color', selectedColorsWithChecked);

                axios.post(url, fData)
                    .then(response => {
                       console.log(response.data);

                        setProductName('');
                        setProductSex('');
                        setProductCategory('');
                        setProductSubCategory('');
                        setProductDetails('');
                        setProductPrice('');
                        setProductStock('');
                        setProductImg('');
                        setSelectedSizes([]);
                        setSelectedColors([]);
                        setSelectedQuantities([]);
                        setSizeData({}); 
                        alert(response.data);
                        document.getElementById('formFile').value = '';

                    })
                    .catch(error => alert(error));
            }
        }
    }

    const handleSex = (e) =>{
        setProductSex(e.target.value);
    }

    const handleCategory = (e) => {
        setProductCategory(e.target.value);
    }

    const containerStyle = {
        backgroundColor: "#F6F6F6",
        marginBottom: "10%",
        position: 'relative',
        zIndex: 1
    }

    const sizeColors ={
        backgroundColor: "#EBEBEB",
    }
   
    return(
        <>
            <div className="container-fluid p-5" id="addProduct-container" style={containerStyle}>
                <div className="row">
                    <div className="col">
                        <h3>Basic Information</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Product Image</h3>
                    </div>
                    <div className="col">
                        <input className="form-control mb-3" onChange={(e) => setProductImg(e.target.files[0])} name="product_img" type="file" id="formFile"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control form-control-sm" value={product_name} onChange={(e) => setProductName(e.target.value)} name="product_name" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Product Name</label>
                         </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                                <select id="inputGroupSelect02" className="form-select" value={product_sex} name="product_sex" onChange={handleSex} >
                                    <option value="DEFAULT">Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                        </div>
                    </div> 
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <select id="inputGroupSelect02" className="form-select" value={product_category} name="product_category" onChange={handleCategory} >
                                <option value="DEFAULT">Select a category---</option>
                                <option value="Top">Top</option>
                                <option value="Bottom">Bottom</option>
                            </select>
                         </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                                <select id="inputGroupSelect02" className="form-select" value={product_sub_category} onChange={(e) => setProductSubCategory(e.target.value)} name="product_sub_category"  >
                                <option value="DEFAULT">Select a clothing category---</option>
                                {product_category === "Top" && <TopDrop onSelectSubCategory={setProductSubCategory} />}
                                {product_category === "Bottom" && <BottomDrop onSelectSubCategory={setProductSubCategory} />}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <textarea className="form-control" name="product_details" value={product_details} onChange={(e) => setProductDetails(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                            <label htmlFor="floatingTextarea">Product Details</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control form-control-sm" value={product_price} onChange={(e) => setProductPrice(e.target.value)} name="product_price" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Price</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="container">
                        <div className="row">
                            <span>Size & Colors</span>
                        </div>
                        <div className="row p-4" style={sizeColors}>
                            <div className="container-fluid">
                                <div className="row mb-3">
                                    <div className="col-lg-2">
                                        <span>Size</span>
                                    </div>
                                    <div className="col-lg-3">
                                        <span>Quantity</span>
                                    </div>
                                </div>
                                {sizes.map((size,index) => (
                                    <div className="row d-flex align-items-center" id="color-size-fields" key={index}>
                                        <div className="col-lg-2">
                                            <div className="form-check d-flex gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    className="form-check-input" 
                                                    onChange={() => handleSizeChange(size)}  
                                                    id={size}
                                                    checked={!!sizeData[size]} // Check if the size exists in sizeData
                                                />
                                                <label htmlFor={size} className="form-check-label">
                                                    {size === 'XS' && 'Extra Small'}
                                                    {size === 'S' && 'Small'}
                                                    {size === 'M' && 'Medium'}
                                                    {size === 'L' && 'Large'}
                                                    {size === 'XL' && 'Extra Large'}
                                                    {size === 'XXL' && size}
                                                    {size === 'XXXL' && size}
                                                </label>
                                            </div>
                                        </div>
                                        {sizeData[size] && (
                                            <>
                                                <div className="col-auto">
                                                    <div className="form-floating mb-3">
                                                        <input 
                                                            type="number" 
                                                            className="form-control form-control-sm" 
                                                            value={sizeData[size].quantity || ''} 
                                                            onChange={(e) => handleQuantityChange(size, e.target.value)} 
                                                            placeholder="Quantity" 
                                                        />
                                                        <label htmlFor={`quantity-${size}`}>Stock</label>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="input-group mb-3">
                                                        <select 
                                                            className="form-select" 
                                                            value={sizeData[size].color || 'DEFAULT'} 
                                                            onChange={(e) => handleColorChange(size, e.target.value)} 
                                                        >
                                                            <option value="DEFAULT">Select a color</option>
                                                            <ColorsDrop onSelectColors={setColors}/>
                                                        </select>
                                                    </div>  
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-end align-items-end">
                    <div className="col-auto">
                             <button className='btn btn-dark' onClick={handleSubmit}>Add Product</button>
                     </div>
                </div>
            </div>
        </>
    )
}