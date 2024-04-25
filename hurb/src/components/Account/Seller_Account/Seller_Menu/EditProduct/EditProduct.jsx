import React, { useState, useEffect } from "react";

function EditProduct({ productData, product }) {

    const[product_name, setProductName] = useState('');
    const[product_sex, setProductSex] = useState('');
    const[product_category, setProductCategory] = useState('');
    const[product_sub_category, setProductSubCategory] = useState('');
    const[product_details, setProductDetails] = useState('');
    const[colors, setColors] = useState('');
    const[product_price, setProductPrice] = useState('');
    const[product_stock, setProductStock] = useState('');
    const[seller_id, setSellerID] = useState('');
    const[sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState([]);
    const [sizeData, setSizeData] = useState({});

    const[passProduct, setPassProduct] = useState([]);

    useEffect(() => {
        setPassProduct(product)
        console.log('passed: ',passProduct);
    })

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

    const handleUpdate = () => {
      
    }

    const handleSex = (e) =>{
        setProductSex(e.target.value);
    }

    const handleCategory = (e) => {
        setProductCategory(e.target.value);
    }

    const containerStyle = {
        backgroundColor: "#F6F6F6",
        marginBottom: "10%"
    }

    const sizeColors ={
        backgroundColor: "#EBEBEB",
    }


  return (
    <>
        <div className="modal fade"  id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Product</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid p-5" style={containerStyle}>
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
            </div>
                </div>
             <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button 
                           type="button" 
                           className="btn btn-primary" 
                           onClick={handleUpdate}
                       >Update</button>
                   </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditProduct