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
    const[product_img, setProductImg] = useState(null);
    const[seller_id, setSellerID] = useState('');
    const[sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
    const [selectedSizes, setSelectedSizes] = useState([]);
    // const [selectedColors, setSelectedColors] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [sectionCount, setSectionCount] = useState(1); // State variable to track the number of sections

    const sizeIndices = {
        'XS': 0,
        'S': 1,
        'M': 2,
        'L': 3,
        'XL': 4,
        'XXL': 5,
        'XXXL': 6
    };

    const [sectionsData, setSectionsData] = useState([
        { color: '', sizes: [], quantities: {}, img: null }
    ]);

    const handleColorChange = (color) => {
        const newSectionsData = [...sectionsData];
        const currentIndex = newSectionsData.length - 1;
        newSectionsData[currentIndex].color = color;
        setSectionsData(newSectionsData);
    }

    const handleSizeChange = (size) => {
        const newSectionsData = [...sectionsData];
        const currentIndex = newSectionsData.length - 1;
        let sizes = [...newSectionsData[currentIndex].sizes];
        const index = sizeIndices[size];
        if (sizes.includes(size)) {
            // Remove size if already selected
            sizes = sizes.filter(s => s !== size);
        } else {
            // Add size if not selected
            sizes = [...sizes, size];
        }
        // Sort sizes based on their indices
        sizes.sort((a, b) => sizeIndices[a] - sizeIndices[b]);
        newSectionsData[currentIndex].sizes = sizes;
        setSectionsData(newSectionsData);
    }
    

    const handleQuantityChange = (size, quantity) => {
        const newSectionsData = [...sectionsData];
        const currentIndex = newSectionsData.length - 1;
        const quantities = { ...newSectionsData[currentIndex].quantities };
        quantities[size] = quantity; // Use size as the key
        newSectionsData[currentIndex].quantities = quantities;
        setSectionsData(newSectionsData);
    }
    
    
    const handleImgChange = (file) => {
        const newSectionsData = [...sectionsData];
        const currentIndex = newSectionsData.length - 1;
        newSectionsData[currentIndex].img = file;
        setSectionsData(newSectionsData);
    }

    const handleAddMore = () => {
        setSectionsData([
            ...sectionsData,
            { color: '', sizes: [], quantities: {}, img: null }
        ]);
    }

    const handleRemoveSection = (indexToRemove) => {
        setSectionsData(prevSections => {
            // Remove the section at the specified index
            const updatedSections = prevSections.filter((_, index) => index !== indexToRemove);
            // Update the index of remaining sections
            return updatedSections.map((section, index) => {
                return {
                    ...section,
                    sizes: section.sizes,
                    quantities: section.quantities,
                    img: section.img,
                    color: section.color
                };
            });
        });
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
        console.log('sizeData: ', sectionsData);
    })

    useEffect(() => {
        getSellerID();
    }, []);

    const handleSubmit = async () => {
        if(product_name.length === 0){
            alert('Product name empty!');
        } else if(product_details.length === 0){
            alert('Product details empty!'); 
        } else if(product_price.length === 0){
            alert('Product price empty!');
        } else {
            try {
                const sections = sectionsData.map(section => ({
                    color: section.color,
                    selectedSizes: section.sizes,
                    quantities: section.quantities,
                    img: section.img
                }));
        
                const formData = {
                    product_name,
                    product_sex,
                    product_category,
                    product_sub_category,
                    product_details,
                    product_price,
                    seller_id,
                    sections
                };
                console.log('FORM DATA: ', formData)
                const response = await axios.post('http://localhost/hurb/add_product.php', formData);
                console.log('success: ', response.data);
                // window.location.reload();
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error here
            }
        }   
    };

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
        backgroundColor: "#FFFFFF",
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
                    <div className="container" >
                        <div className="row">
                            <span>Size & Colors</span>
                        </div>
                        {sectionsData.map((section, index) => (
                            <div className="row p-4 w-50 mb-3" style={sizeColors} key={index} id="size-color">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-auto">
                                            <div className="input-group mb-3"> 
                                                <select
                                                    className="form-select"
                                                    value={section.color}
                                                    onChange={(e) => handleColorChange(e.target.value)}
                                                    >
                                                    <option value="">Select a color</option>
                                                    <ColorsDrop onSelectColors={setSelectedColor} />
                                                </select>
                                            </div>  
                                        </div>
                                        <div className="col d-flex justify-content-end align-items-center">
                                            <div className="btn btn-danger"  onClick={() => handleRemoveSection(index)}>Remove</div>
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
                                                        checked={!!section.sizes.includes(size)}
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
                                            {section.sizes.includes(size) && (
                                                <>
                                                    <div className="col-auto">
                                                        <div className="form-floating mb-3">
                                                            <input 
                                                                type="number" 
                                                                className="form-control form-control-sm" 
                                                                value={section.quantities[size] || ''} 
                                                                onChange={(e) => handleQuantityChange(size, e.target.value)} 
                                                                placeholder="Quantity" 
                                                            />
                                                            <label htmlFor={`quantity-${size}`}>Stock</label>
                                                        </div>
                                                    </div>     
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col mt-5">
                                            <input 
                                                className="form-control mb-3" 
                                                onChange={(e) => handleImgChange(e.target.files[0])} 
                                                name="product_img" 
                                                type="file" 
                                                id="formFile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-dark" onClick={handleAddMore}>+ Add more</button>
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