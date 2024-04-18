import React, { useState, useEffect } from 'react';
import SellerMenu from "../../SellerMenu";
import BottomDrop from './bottomDrop';
import TopDrop from './topDrop';
import axios from 'axios';
import '../Products.css';

export default function addproduct(){

    const[product_name, setProductName] = useState('');
    const[product_sex, setProductSex] = useState('');
    const[product_category, setProductCategory] = useState('');
    const[product_sub_category, setProductSubCategory] = useState('');
    const[product_details, setProductDetails] = useState('');
    const[product_price, setProductPrice] = useState('');
    const[product_stock, setProductStock] = useState('');
    const[product_img, setProductImg] = useState('');
    const[seller_id, setSellerID] = useState('');

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
        getSellerID();
    }, []);

    const handleSubmit = () => {
        if(product_name.length === 0){
            alert('Product name empty!');
        }else if(product_details.length === 0){
            alert('Product details empty!'); 
        }else if(product_price.length === 0){
            alert('Product price empty!');
        }else if(product_stock.length === 0){
            alert('Product stock empty!');
        }else if(!product_img){
            alert('Please provide an image for your product!');
        }else{

            const url ="http://localhost/hurb/add_product.php" ;
            

            let fData = new FormData();
            fData.append('seller_id', seller_id);
            fData.append('product_name', product_name);
            fData.append('product_sex', product_sex);
            fData.append('product_category', product_category);
            fData.append('product_sub_category', product_sub_category);
            fData.append('product_details', product_details);
            fData.append('product_price', product_price);
            fData.append('product_img', product_img);
            fData.append('product_stock', product_stock);

            axios.post(url, fData)
            .then(response=>{
                alert(response.data);

                
                setProductName('');
                setProductSex('');
                setProductCategory('');
                setProductSubCategory('');
                setProductDetails('');
                setProductPrice('');
                setProductStock('');
                setProductImg('');
                document.getElementById('formFile').value = '';

            })
            .catch(error=>alert(error));
        }
    }

    const handleSex = (e) =>{
        setProductSex(e.target.value);
    }

    const handleCategory = (e) => {
        setProductCategory(e.target.value);
    }

    return(
        <>
        <div className="container-fluid" id="account-container">
            <div className="row gap-5">
               <SellerMenu></SellerMenu>
               <div className="col">
               <hr className="border border-dark border-1 opacity-40" id="hr1"/>
               <div className="container-fluid">
                   <div className="col">
                    <h1 className="d-flex align-items-center justify-content-center">New Product</h1>
                   <div className="form" id="addForm">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control form-control-sm" value={product_name} onChange={(e) => setProductName(e.target.value)} name="product_name" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Product Name</label>
                         </div>

                         <div className="input-group mb-3">
                            <select id="inputGroupSelect02" className="form-select" value={product_sex} name="product_sex" onChange={handleSex} >
                                <option value="DEFAULT">Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                         </div>

                         <div className="input-group mb-3">
                            <select id="inputGroupSelect02" className="form-select" value={product_category} name="product_category" onChange={handleCategory} >
                                <option value="DEFAULT">Select a category---</option>
                                <option value="Top">Top</option>
                                <option value="Bottom">Bottom</option>
                            </select>
                         </div>

                         <div className="input-group mb-3">
                                <select id="inputGroupSelect02" className="form-select" value={product_sub_category} onChange={(e) => setProductSubCategory(e.target.value)} name="product_sub_category"  >
                                <option value="DEFAULT">Select a clothing category---</option>
                                {product_category === "Top" && <TopDrop onSelectSubCategory={setProductSubCategory} />}
                                {product_category === "Bottom" && <BottomDrop onSelectSubCategory={setProductSubCategory} />}
                            </select>
                        </div>

                         <div className="form-floating mb-3">
                            <textarea className="form-control" name="product_details" value={product_details} onChange={(e) => setProductDetails(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                            <label htmlFor="floatingTextarea">Details</label>
                        </div>

                         <div className="form-floating mb-3">
                            <input type="text" className="form-control form-control-sm" value={product_price} onChange={(e) => setProductPrice(e.target.value)} name="product_price" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Price</label>
                         </div>

                         <div className="form-floating mb-3">
                            <input type="number" className="form-control form-control-sm" value={product_stock} onChange={(e) => setProductStock(e.target.value)} name="product_stock" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Stock</label>
                         </div>
                            <input className="form-control mb-3" onChange={(e) => setProductImg(e.target.files[0])} name="product_img" type="file" id="formFile"></input>

                            <button className="btn btn-primary" type="button" name="send" onClick={handleSubmit}>Add Product</button>
                    </div>
                   </div>
               </div>
               </div>
            </div>
       </div>
        </>
    )
}