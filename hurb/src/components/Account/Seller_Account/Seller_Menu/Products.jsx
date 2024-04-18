import SellerMenu from "../SellerMenu";
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Products.css';

export default function Products(){

    const [products, setProducts] = useState([]);

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

    return(
        <>
        <div className="container-fluid" id="account-container">
            <div className="row gap-5">
               <SellerMenu></SellerMenu>
               <div className="col">
               <hr className="border border-dark border-1 opacity-40" id="hr1"/>
               <div className="container-fluid">
                    <Link to="/seller/products/addproducts" className="btn btn-secondary mb-5">+ Add New Product</Link>
                    <div className="row">
                    {products.map((product, index) => (
                        <div className="col-4 mb-5" key={product.product_id}>
                             <div className="card" id="card">
                                 <img src={`http://localhost/hurb/${product.product_img}`} alt={product.product_name} id="productImg"/>
                                <div className="card-body">
                                        <h5 className="card-title">{product.product_name}</h5>
                                        <p className="card-text">{product.product_details}</p>
                                        <p className="card-text">Price: {product.product_price}</p>
                                    </div>
                             </div>
                        </div>
                        ))}
                    </div>
               </div>
               </div>
            </div>
       </div>
        </>
    )
}

