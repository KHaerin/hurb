import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as GoIcons from 'react-icons/go';
import './Products.css';
import EditProduct from './EditProduct/EditProduct';

export default function Products(){

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const getUserId = localStorage.getItem('userId');
                const responseSeller = await axios.get(`http://localhost/hurb/seller/get_seller.php?user_id=${getUserId}`);
                const dataFetch = responseSeller.data;
                const getSellerID = dataFetch.seller_id;
                const response = await axios.get(`http://localhost/hurb/products.php?seller_id=${getSellerID}`);
                setProducts(response.data);
            }catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchProducts();
    }, []);

    

    useEffect(() => {
        console.log(products);
    })


    const editBtn = (productId) => {
        setSelectedProduct(productId);
    }

    const handleProductData = (data) => {

    }

    const removeItem = async(productId) => {
        try{
            const formData = new FormData();
            formData.append('product_id', productId);

            const response = await axios.post("http://localhost/hurb/Seller/removeProduct.php", formData);
            console.log(response.data);
            window.location.reload();
        }catch(error){
            console.error(error);
        }
    }

    const actionBtn = {
        color: 'red',
        width: '25px',
        height: '25px'
    }


    return(
        <>
        <div className="container-fluid" id="account-container">
            <div className="row gap-5">
               <div className="col">
               <div className="container-fluid">
                {products.length === 0 ? 
                    <h1>No Products available sabi ni idol karl</h1>
                : 
                <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Sales</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                  
                    {products.map((product, index) => (
                    <tbody key={product.product_id}>
                         <tr>
                             <th scope="row">
                                <span>
                                    <h2 className='d-flex mt-4'>{product.product_id}</h2>
                                </span>                     
                             </th>
                             <td> {product.colors.length > 0 && (
                                        <img src={`http://localhost/hurb/${product.colors[0].product_img}`} alt="" id="product-seller-image"/>
                                    )}
                                    {product.product_name}
                            </td>
                             <td><span className='d-flex mt-4'>{product.product_price}</span></td>
                             <td><span className='d-flex mt-4'>{product.product_stock}</span></td>
                             <td><span className='d-flex mt-4'>0</span></td>
                             <td className=''>
                                <div className="d-flex mt-3 gap-3">
                                    <button className='btn' onClick={() => editBtn(product.product_id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaIcons.FaRegEdit style={actionBtn}></FaIcons.FaRegEdit></button>
                                    <button className='btn' onClick={() => removeItem(product.product_id)}><GoIcons.GoTrash style={actionBtn}></GoIcons.GoTrash></button>
                                </div> 
                            </td>
                         </tr>
                     </tbody>
                    ))}
                  
                       
                </table> 
                </>
                }
                  
               </div>
               </div>
            </div>
       </div>
       <EditProduct productData={handleProductData} product={selectedProduct}></EditProduct>
        </>
    )
}

