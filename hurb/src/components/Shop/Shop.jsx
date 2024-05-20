import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaIcons from 'react-icons/fa';
import { faSlidersH} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Filter from './Filter/Filter';
import { Container, Row, Col, Button, Image, InputGroup, Card, Breadcrumb, Form} from 'react-bootstrap';

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [counter, setCount] = useState('');
    const storedFilterVisible = localStorage.getItem('filterVisible');
    const [filterVisible, setFilterVisible] = useState(storedFilterVisible);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    

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

    useEffect(() => {
        let filtered = products;
    
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        if (selectedSubCategory) {
            filtered = filtered.filter(product =>
                product.product_sub_category.toLowerCase() === selectedSubCategory.toLowerCase()
            );
        }
    
        setFilteredProducts(filtered);
    }, [searchQuery, selectedSubCategory, products]);


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/hurb/products.php');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategorySelect = (category, subCategory) => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory);
    };

  
    const priceStyle ={
        fontSize: '1.3rem',
        fontWeight: 'bold'
    }

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

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedProductColors, setSelectedProductColors] = useState({}); 
    const [selectedProductImages, setSelectedProductImages] = useState({});

    useEffect(() => {
        const defaultProductColors = {};
        const defaultProductImages = {};
        products.forEach(product => {
            const defaultColor = Object.keys(product.colors)[0];
            defaultProductColors[product.product_id] = defaultColor;
            defaultProductImages[product.product_id] = product.colors[defaultColor];
        });
        setSelectedProductColors(defaultProductColors);
        setSelectedProductImages(defaultProductImages);
    }, [products]); 
    
    
   
    const handleColorChange = (productId, color, product) => {
        setSelectedProductColors(prevState => ({
            ...prevState,
            [productId]: color
        }));

        setSelectedProductImages(prevState => ({
            ...prevState,
            [productId]: product.colors[color]
        }));
        setSelectedColor(color); 
    };

    const handleColorHover = (productId, color, product) => {
        setSelectedProductImages(prevState => ({
            ...prevState,
            [productId]: product.colors[color]
        }));
    };
    
    const handleColorLeave = (productId, product) => {
        const defaultColor = selectedProductColors[productId]; 
        setSelectedProductImages(prevState => ({
            ...prevState,
            [productId]: product.colors[defaultColor] 
        }));
    };

    const [heartStates, setHeartStates] = useState({}); // State to manage heart icon for each product


    useEffect(() => {
        // Initialize heart state for each product
        const initialHeartStates = {};
        products.forEach(product => {
            initialHeartStates[product.product_id] = false;
        });
        setHeartStates(initialHeartStates);
    }, [products]); 

    const handleHeartChange = (productId) => {
        setHeartStates(prevState => ({
            ...prevState,
            [productId]: !prevState[productId] // Toggle the heart state for the clicked product
        }));
    }


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
                       <Container fluid className='d-flex justify-content-end align-items-center'>
                            <Row>
                                <Col lg={8} className=''>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Search"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <Button variant= 'success' id="basic-addon2"><FaIcons.FaSearch /></Button>
                                    </InputGroup>
                                </Col>
                                <Col className='col-auto'>
                                    <span className='d-flex align-items-center gap-2' id="filter-btn" onClick={toggleFilterVisibility}>
                                    {filterVisible ? 'Hide Filters' : 'Show Filters'}
                                    <FontAwesomeIcon icon={faSlidersH} />
                                    </span>
                                </Col>
                            </Row>
                       </Container>
                        
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
                            {filteredProducts.map((product, index) => (
                                <div className="col-lg-4 col-md-6 mb-5 d-flex justify-content-center p-3" key={product.product_id} id="Product-Card-1">
                                    <Card id="card-product">
                                        <Link to={`/shop/productLook/${product.product_id}`} id="product-shop-img-2" className={filterVisible ? 'normal' : 'largeUp'}>
                                            <Image fluid src={`http://localhost/hurb/${selectedProductImages[product.product_id]}`} alt="" id="product-shop-img"/>
                                        </Link>
                                        <div className="d-flex align-items-center justify-content-end mt-3" id={`heart-${product.product_id}`} onClick={() => handleHeartChange(product.product_id)}>
                                            <span id="heartIcon">
                                                {heartStates[product.product_id] ? <FaIcons.FaHeart/> : <FaIcons.FaRegHeart/>}
                                            </span>
                                        </div>
                                        <hr className="border border-dark border-1 opacity-40" id="shop-line" />
                                        <Card.Link href={`/shop/productLook/${product.product_id}`} className="d-flex flex-column text-decoration-none text-dark">
                                                <span id="product-name">{product.product_name}</span>
                                                <span id="product-price" style={priceStyle}>{`$` + product.product_price + '.00'}</span>
                                                <span className='d-flex gap-2' id="product-details">
                                                    <span>{product.product_sex}</span>
                                                    <span>{product.product_category}</span>
                                                    <span>{product.product_sub_category}</span>
                                                </span>
                                        </Card.Link>
                                        <div id="product-color" className='d-flex gap-3'>
                                            {Object.keys(product.colors).map((color, index) => (
                                                <div key={index}>
                                                    <input       
                                                        type="radio" 
                                                        className={`btn-check`}  
                                                        name={`options-${product.product_id}`} 
                                                        id={`option-${product.product_id}-${color}`} 
                                                        autoComplete="off"
                                                        checked={selectedProductColors[product.product_id] === color} 
                                                        onChange={() => handleColorChange(product.product_id, color, product)} 
                                                    />
                                                    <label 
                                                        htmlFor={`option-${product.product_id}-${color}`} // Match the ID used in the input element
                                                        className={`btn color-radio  ${color === 'White' ? 'whiteBg' : ''}`}
                                                        style={{ 
                                                            backgroundColor: colorBgMap[color],
                                                            border: selectedColor === color ? '3px solid #A6A6A6' : ''
                                                        }}
                                                        onMouseEnter={() => handleColorHover(product.product_id, color, product)}
                                                        onMouseLeave={() => handleColorLeave(product.product_id, product)}
                                                    ></label>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>   
        </>        
    );
}
