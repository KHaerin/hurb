import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH} from '@fortawesome/free-solid-svg-icons';
import Heart from '../icons/heart.svg';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Filter from './Filter/Filter';


export default function Shop() {

    const [products, setProducts] = useState([]);
    const [counter, setCount] = useState('');
    const [filterVisible, setFilterVisible] = useState(true);
    
    const toggleFilterVisibility = () => {
        setFilterVisible(prevState => !prevState);
    }

    useEffect(() => {
        setCount(products.length);
        fetchProducts();
    }, []); 

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/hurb/products.php');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="container-fluid mt-5" id="shop-section">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Shop</a></li>
                                <li className="breadcrumb-item"><a href="#">Top</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Shirt</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col d-flex gap-5 align-items-center justify-content-end">
                        <span className='d-flex align-items-center gap-2' id="filter-btn" onClick={toggleFilterVisibility}>
                            {filterVisible ? 'Hide Filters' : 'Show Filters'}
                            <FontAwesomeIcon icon={faSlidersH} />
                        </span>
                        <span>Sort By</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto">
                        <h3>Men's Collection (69)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className='col-auto'>
                        <Filter isVisible={filterVisible} />
                    </div>
                    <div className="col mt-4">
                        <div className="container-fluid">
                            <div className={`row d-flex justify-content-${counter <= 2 ? 'evenly' : 'between'}`}>
                            {products.map((product, index) => (
                                        <Link to={`/shop/productLook/${product.product_id}`} className="col-lg-4 col-md-6 mb-5 d-flex justify-content-center" key={product.product_id} id="Product-Card-1">
                                            <div className="card" id="card-product">
                                                <img src={`http://localhost/hurb/${product.product_img}`} alt="" id="product-shop-img" className={filterVisible ? 'normal' : 'largeUp'}/>
                                                <div className="d-flex align-items-center justify-content-end mt-3">
                                                    <img src={Heart} alt="" id="heartIcon" />
                                                </div>
                                                <hr className="border border-dark border-1 opacity-40" id="shop-line" />
                                                <div className="card-details d-flex flex-column">
                                                    <h3 id="product-name">{product.product_name}</h3>
                                                    <p className='d-flex gap-2' id="product-details">
                                                        <span>{product.product_sex}</span>
                                                        <span>{product.product_category}</span>
                                                        <span>{product.product_sub_category}</span>
                                                    </p>
                                                    <p id="product-color">color diri</p>
                                                    <p id="product-price">{product.product_price}</p>
                                                </div>
                                            </div>
                                    </Link>
                                 ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>        
    );
}

