import React from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';


export default function Dashboard() {
  return (
    <>
        <Container fluid>
            <Row className='mb-5'>
                <Col id="sales-container" className=''>
                    <Container fluid id="sales-container-inside">
                        <Row className='p-3'>
                            <Col>
                                <span>Overall Sales</span>
                            </Col>
                            <Col>
                                <li className='nav-item dropdown'>
                                    <nav className="nav-link dropdown-toggle pointers-events-none" id="headerLinks" role="button" data-bs-toggle="dropwdown" aria-expanded="false" aria-disabled>This Month</nav>
                                    <ul className="dropdown-menu dropdown-menu-hover">
                                        <li className="dropdown-item"><nav className='nav-link'>Month</nav></li>
                                        <li className='dropdown-item'><nav className='nav-link'>Months</nav></li>
                                    </ul>

                                </li>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container fluid>
                        <Row className='mb-5'>
                            <Col>
                                <Container fluid>
                                    <Row className='d-flex mb-2'>
                                        <Col id="dashIcon-container">
                                            <span id="dashIcon"><FaIcons.FaShoppingBag/></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>Total Sales</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>$108,560.93</span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col className=''>
                                <Container fluid>
                                    <Row className='d-flex mb-2'>
                                        <Col id="dashIcon-container">
                                            <span id="dashIcon"><FaIcons.FaClipboardList></FaIcons.FaClipboardList></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>Avg. Order Value</span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Container fluid>
                                    <Row className='d-flex mb-2'>
                                        <Col id="dashIcon-container">
                                            <span id="dashIcon"><FaIcons.FaShoppingBag/></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>Total Sales</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>$108,560.93</span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col>
                                <Container fluid>
                                    <Row className='d-flex mb-2'>
                                        <Col id="dashIcon-container">
                                            <span id="dashIcon"><FaIcons.FaShoppingBag/></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>Total Sales</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>$108,560.93</span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
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
                                    <tr>
                                        <th scope="row">
                                                <h2 className='d-flex mt-4'>1</h2>                  
                                        </th>
                                        <td><img src='' alt="" id="product-seller-image"/><span>Name</span></td>
                                        <td><span className='d-flex mt-4'>50.00</span></td>
                                        <td><span className='d-flex mt-4'>53 pcs</span></td>
                                        <td><span className='d-flex mt-4'>In Stocks</span></td>
                                    </tr>
                                </tbody>
                            </table> 
                            </Col>  
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container fluid>
                        <Row>
                            <Col>
                                <span>Top Countries</span>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </>
  )
}
