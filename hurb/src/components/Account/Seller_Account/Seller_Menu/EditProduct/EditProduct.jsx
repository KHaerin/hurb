import {Container, Row, Col, Modal, Card, Button} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import BottomDrop from '../addproduct/bottomDrop';
import TopDrop from '../addproduct/topDrop';
import ColorsDrop from './dropColor';
import axios from 'axios';


function EditProduct({ showPay, handleClosePay, product }) {

    const[productName, setProductName] = useState('');

    const[product_name, setProduct_Name] = useState('');
    const[product_category, setProductCategory] = useState('');
    const[product_sub_category, setProductSubCategory] = useState('');
    const[product_details, setProductDetails] = useState('');
    const[product_price, setProductPrice] = useState('');
    const[product_img, setProductImg] = useState(null);
    const[sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
    const [variants, setVariants] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    useEffect(() => {
        if(product){
            fetchSizes(product);
        }      
    }, [product]);

    const [products, setProduct] = useState([]);

    const fetchSizes = async(product) => {
        try {
            const response = await axios.get(`http://localhost/hurb/selectSizes.php?product_id=${product}`);
            setProduct(response.data);

            if(response){
                const stockFetch = response.data[0];
                const categFetch = stockFetch.product_category;
                const nameFetch = stockFetch.product_name;
                const subCategFetch = stockFetch.product_sub_category;
                const detailsFetch = stockFetch.product_details;
                const price = stockFetch.product_price;

                setProductName(nameFetch);
                setProduct_Name((nameFetch));
                setProductCategory(categFetch);
                setProductSubCategory(subCategFetch);
                setProductDetails(detailsFetch);
                setProductPrice(price);
            } 
        } catch (error) {
            console.error('Error fetching sizes: ', error);
        }
    }

    const card = {
        width: '400px'
    }

    const uniqueColors = {};
    const colorData = {};

    
    const filteredProducts = products.filter(product => {
        if (!uniqueColors[product.color_id]) {
           
            colorData[product.color_id] = { sizes: [product.size], quantities: [product.quantity] };
            uniqueColors[product.color_id] = true;
            return true;
        } else {
          
            colorData[product.color_id].sizes.push(product.size);
            colorData[product.color_id].quantities.push(product.quantity);
        }
        return false;
    });

    useEffect(() => {
        console.log('colordata: ', colorData);
        console.log('variants: ',variants);
        console.log('selected: ', selectedProduct);
    })

    const getProductImage = (product) => {
        const image = product.images.find(image => image.color_id === product.color_id);
        if (image) {
            return `http://localhost/hurb/${image.product_img}`;
        } else {
            return 'holder.js/100px180'; 
        }
    };

   
    const [existingData, setExistingData] = useState([
        { color: '', sizes: [], quantities: {}, product_img: '' }
    ]);
    

    const handleExistColorChange = (color, index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].color = color;
        setVariants(updatedVariants);
    };


    const [colorExist, setColorExist] = useState([]);

    
    
    const image_style = {
        width: "200px",
        height: "200px"
    }


    const [fullscreen, setFullscreen] = useState(true);
    return (
        <>
            <Modal fullscreen={fullscreen} show={showPay} onHide={handleClosePay}>
                <Modal.Header closeButton>
                    <Modal.Title>{productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='mb-5'>
                        <Row>
                            <Col>
                                <h1>Product Details</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>  
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control form-control-sm" value={product_name} onChange={(e) => setProduct_Name(e.target.value)} name="product_name" id="floatingInput" placeholder="name@example.com"/>
                                <label htmlFor="floatingInput">Product Name</label>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="input-group mb-3">
                                    <select id="inputGroupSelect02" className="form-select" value={product_category} name="product_category" onChange={(e) => setProductCategory(e.target.value)} >
                                        <option value="DEFAULT">Select a category---</option>
                                        <option value="Top">Top</option>
                                        <option value="Bottom">Bottom</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="input-group mb-3">
                                <select id="inputGroupSelect02" className="form-select" value={product_sub_category} onChange={(e) => setProductSubCategory(e.target.value)} name="product_sub_category"  >
                                    <option value="DEFAULT">Select a clothing category---</option>
                                    {product_category === "Top" && <TopDrop onSelectSubCategory={setProductSubCategory} />}
                                    {product_category === "Bottom" && <BottomDrop onSelectSubCategory={setProductSubCategory} />}
                                </select>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" name="product_details" value={product_details} onChange={(e) => setProductDetails(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    <label htmlFor="floatingTextarea">Product Details</label>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control form-control-sm" value={product_price} onChange={(e) => setProductPrice(e.target.value)} name="product_price" id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Price</label>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {/* EXISTING PRODUCT VARIANTS */}
                    <Container>
                        <section id="existing-product-variant">
                        <Row>
                            {filteredProducts.map((product, index) => (
                                <Col lg={4} className='mb-5' key={index}>                              
                                    <Card style={card}>
                                        <div className='d-flex justify-content-center align-items-center p-4'>
                                            <Card.Img variant="top" style={image_style} src={getProductImage(product)} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{product.color}</Card.Title>
                                            <Card.Text>
                                            Sizes: {colorData[product.color_id].sizes.map((size, sizeIndex) => (
                                            <span key={sizeIndex}>
                                                {size} ({colorData[product.color_id].quantities[sizeIndex]}), 
                                            </span>
                                            ))}
                                            </Card.Text>
                                            <div className="input-group mb-3">
                                                <select
                                                    className="form-select"
                                                    value={product.color}
                                                    onChange={(e) => handleExistColorChange(e.target.value, index)}>
                                                    <option value="">Select a color</option>
                                                    <ColorsDrop 
                                                        onSelectColors={color => handleColorChange(color, index)} 
                                                        selectedColors={product.color} 
                                                        allSelectedColors={filteredProducts.map(section => section.color)} 
                                                    />
                                                </select>
                                            </div>
                                            {sizes.map((size, sizeindex) => (
                                                <div className="row d-flex align-items-center" key={`${sizeindex}-${index}`}>
                                                    <div className="col-lg-2">
                                                        <div className="form-check d-flex gap-2">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                            <label className="form-check-label">{size}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}        
                                            {/* <Button variant="primary">Go somewhere</Button> */}
                                        </Card.Body>
                                    </Card>                                    
                                </Col>
                            ))}
                        </Row>
                        </section> 
                        {/* END OF EXISTING PRODUCT VARIANT */}                   
                    </Container>  
                            
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePay}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default EditProduct;