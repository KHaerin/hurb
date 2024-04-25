import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import Heart from '../icons/heart.svg';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Filter from './Filter/Filter';
import { Container, Row, Col, Button, Image, InputGroup, Card, Breadcrumb} from 'react-bootstrap';

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [counter, setCount] = useState('');
    const storedFilterVisible = localStorage.getItem('filterVisible');
    const [filterVisible, setFilterVisible] = useState(storedFilterVisible);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const toggleFilterVisibility = () => {
        setFilterVisible(prevState => !prevState);
    }

    useEffect(() => {
        if (storedFilterVisible !== null) {
            setFilterVisible(storedFilterVisible === 'true');
        }
        setCount(products.length); 
        fetchProducts();
    }, []); 

    useEffect(() => {
        localStorage.setItem('filterVisible', filterVisible);
    }, [filterVisible]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/hurb/products.php');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategorySelect = (category, subCategory) => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory);
    };

    const filteredProducts = selectedSubCategory
    ? products.filter(product => product.product_sub_category === selectedSubCategory)
    : products;
    
    return (
        <>
            <Container fluid className="mt-5" id="shop-section">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/shop">Shop</Breadcrumb.Item>
                            {selectedSubCategory && <Breadcrumb.Item active>{selectedSubCategory}</Breadcrumb.Item>}                        
                        </Breadcrumb>
                    </Col>
                    <Col className="d-flex gap-5 align-items-center justify-content-end">
                        <span className='d-flex align-items-center gap-2' id="filter-btn" onClick={toggleFilterVisibility}>
                            {filterVisible ? 'Hide Filters' : 'Show Filters'}
                            <FontAwesomeIcon icon={faSlidersH} />
                        </span>
                        <span>Sort By</span>
                    </Col>
                </Row>
                <Row>
                    <div className="col-auto" id="category-title">
                        <h3>{selectedSubCategory ? selectedSubCategory : 'All Items'} ({filteredProducts.length})</h3>                    
                    </div>
                </Row>
                <Row>
                    <Col className='col-auto'>
                        <Filter 
                            isVisible={filterVisible} 
                            products={products} 
                            onCategorySelect={handleCategorySelect} 
                        />
                    </Col>
                    <Col className="mt-4">
                        <Container fluid>
                            <Row className={`d-flex`}>
                            {products
                                .filter(product => !selectedSubCategory || product.product_sub_category === selectedSubCategory)
                                .map((product, index) => (
                                    <Link to={`/shop/productLook/${product.product_id}`} className="col-lg-4 col-md-6 mb-5 d-flex justify-content-center" key={product.product_id} id="Product-Card-1">
                                        <Card id="card-product">
                                            <Image fluid src={`http://localhost/hurb/${product.product_img}`} alt="" id="product-shop-img" className={filterVisible ? 'normal' : 'largeUp'}/>
                                            <div className="d-flex align-items-center justify-content-end mt-3">
                                                <Image src={Heart} alt="" id="heartIcon" />
                                            </div>
                                            <hr className="border border-dark border-1 opacity-40" id="shop-line" />
                                            <Card.Text className="d-flex flex-column">
                                                <span id="product-name">{product.product_name}</span>
                                                <span className='d-flex gap-2' id="product-details">
                                                    <span>{product.product_sex}</span>
                                                    <span>{product.product_category}</span>
                                                    <span>{product.product_sub_category}</span>
                                                </span>
                                                <span id="product-color">color diri</span>
                                                <span id="product-price">{product.product_price}</span>
                                            </Card.Text>
                                        </Card>
                                    </Link>
                                ))
                            }
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>   
        </>        
    );
}

