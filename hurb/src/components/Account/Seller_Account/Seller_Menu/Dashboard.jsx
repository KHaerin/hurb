import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function Dashboard() {
    const [myOrders, setOrder] = useState([]);
    const [orders, setOrders] = useState([]);
    const [myProducts, setProducts] = useState([]);

    useEffect(() => {
        const getSales = async () => {
            try {
                const seller_id = localStorage.getItem('sellerId');
                const url = await axios.get(`http://localhost/hurb/Seller/getSales.php?seller_id=${seller_id}`);
                const getOrders = await axios.get(`http://localhost/hurb/Seller/GetOrders.php?seller_id=${seller_id}`);
                const response = await axios.get(`http://localhost/hurb/products.php?seller_id=${seller_id}`);

                setProducts(response.data);
                const orders = url.data;
                const urlOrder = getOrders.data;
                setOrders(urlOrder);
                setOrder(orders);
            } catch (error) {
                console.error('myOrder error: ', error);
            }
        };
        getSales();
    }, [])


    useEffect(() => {
        console.log(myOrders);
    }, [myOrders])

    const uniqueProducts = Array.isArray(myOrders) ? myOrders.reduce((acc, current) => {
        const existing = acc.find(item => item.product_id === current.product_id);
        if (!existing) {
            acc.push(current);
        }
        return acc;
    }, []) : [];

    const countReceivedOrdersForProduct = (productId) => {
        return myOrders.filter(order => order.deliver_status === 'Received' && order.product_id === productId).length;
    }

    return (
        <>
            <Container fluid>
                {orders.length > 0 ? 
                <>
                <Row className='mb-5'>
                    <Col lg={12}>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <span>Selling Products</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product ID</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uniqueProducts.map((order, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <h2 className='d-flex mt-4'>{order.product_id}</h2>
                                                    </th>
                                                    <td>
                                                        <img src={`http://localhost/hurb/${order.product_images[0]}`} alt="" id="product-seller-image" />
                                                        <span>{order.product_name}</span>
                                                    </td>
                                                    <td><span className='d-flex mt-4'>{order.product_price}.00</span></td>
                                                    <td><span className='d-flex mt-4'>{countReceivedOrdersForProduct(order.product_id)}</span></td>
                                                    <td><span className='d-flex mt-4'>{order.product_stock < 1 ? 'Out of stock' : 'In Stocks'}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                        <Row className="d-flex gap-5">
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Sales</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{myOrders.length >= 1 ? myOrders.length : '0'}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Orders</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{orders.length}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Products</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{myProducts.length}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        </Row>
                    </Container>
                    </Col>  
                </Row>
                </> 
                : 
                <>
                    <Container>
                        <Row className="d-flex gap-5">
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Sales</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{myOrders.length >= 1 ? myOrders.length : '0'}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Orders</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{orders.length}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={4} id="sales-container" className='rounded'>
                            <Container fluid id="sales-container-inside">
                                <Row className='p-3'>
                                    <Col>
                                        <h4>Number of Products</h4>
                                    </Col>
                                </Row>
                                <Row className='px-3'>
                                    <Col>
                                        <h1>{myProducts.length}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        </Row>
                    </Container>
                </>}
            </Container>
        </>
    )
}
