import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Nav, Image, Button} from 'react-bootstrap';

function MyOrder() {

    const [activeKey, setActiveKey] = useState("All");

    const handleSelect = (eventKey) => {
      setActiveKey(eventKey);
    };

    const[myOrders, setOrder] = useState([]);

    useEffect(() => {
        const getAddressBook = async () => {
            try{
                const user_id = localStorage.getItem('userId');
                const url = await axios.get(`http://localhost/hurb/CustomerOrder/MyOrder.php?user_id=${user_id}`);
                const orders = url.data;
                setOrder(orders);
                console.log('ORDERS: ', orders);
            }catch(error){
                console.error(error);
            }
        };
        getAddressBook();
    }, [])


    const order_container = {
        backgroundColor: '#F8F8F8'
    }

    const product_size = {
        width: '10rem'
    }

    const ratebuyBtn = {
        width: '10rem'
    }

  return (
    <>
         <Container fluid>
        <Row className='mb-4'>
          <Nav variant="tabs" defaultActiveKey="All" onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="All" active={activeKey === "All"}>All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ship" active={activeKey === "ship"}>To Ship</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="toReceive" active={activeKey === "toReceive"}>To Receive</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="received" active={activeKey === "received"}>Received</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Container fluid>
            <Row>
              <Col>
                {activeKey === "All" &&
                    <Container fluid className='d-flex flex-column gap-4'>
                        {myOrders.map((order, index) => (
                        <div key={order.order_item_id} style={order_container}>
                            <Row className='p-5' >
                                <Col className='col-auto'>
                                    <Image src={`http://localhost/hurb/${order.product_img}`} style={product_size}></Image>
                                </Col>
                                <Col className='d-flex flex-column'>
                                    <span>{order.product_name}</span>
                                    <div className="below d-flex gap-3">
                                        <span>{`Quantity: ${order.quantity}`}</span>
                                        <span>{`Variation: Black, ${order.size}`}</span>
                                        <span>{`P${order.unit_price}`}</span>
                                    </div>
                                </Col>
                                <Col className='d-flex justify-content-end align-items-end'>
                                    <span>{`Order Total: ${order.totalPayable}`}</span>
                                </Col>
                            </Row>
                            <Row className='d-flex align-items-center justify-content-center'>
                                <Col lg={11}>
                                    <hr className="border border-dark border-1 opacity-40"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                {order.deliver_status === "ship" && 
                                    <Button variant="dark" disabled>Order Received</Button>
                                }
                                {order.deliver_status === "onDeliver" && 
                                    <Button variant="dark">Order Received</Button>
                                }
                                {order.deliver_status === "received" && 
                                <>
                                    <Button variant="dark" style={ratebuyBtn}>Rate</Button>
                                    <Button variant="secondary" style={ratebuyBtn}>Buy Again</Button>
                                </>    
                                }
                                </Col>
                            </Row>
                        </div> 
                        ))}
                    </Container>
                }
                {activeKey === "ship" &&
                    <Container fluid className='d-flex flex-column gap-4'>
                    {myOrders
                    .filter(order => order.deliver_status === 'ship')
                    .map((order, index) => (
                    <div key={order.order_item_id} style={order_container}>
                        <Row className='p-5' >
                            <Col className='col-auto'>
                                <Image src={`http://localhost/hurb/${order.product_img}`} style={product_size}></Image>
                            </Col>
                            <Col className='d-flex flex-column'>
                                <span>{order.product_name}</span>
                                <div className="below d-flex gap-3">
                                    <span>{`Quantity: ${order.quantity}`}</span>
                                    <span>{`Variation: Black, ${order.size}`}</span>
                                    <span>{`P${order.unit_price}`}</span>
                                </div>
                            </Col>
                            <Col className='d-flex justify-content-end align-items-end'>
                                <span>{`Order Total: ${order.totalPayable}`}</span>
                            </Col>
                        </Row>
                        <Row className='d-flex align-items-center justify-content-center'>
                            <Col lg={11}>
                                <hr className="border border-dark border-1 opacity-40"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex justify-content-end mx-5 mb-3'>                
                                <Button variant="dark" disabled>Order Received</Button>
                            </Col>
                        </Row>
                    </div> 
                    ))}
                </Container>
                }
                {activeKey === "toReceive" &&
                  <Container fluid className='d-flex flex-column gap-4'>
                  {myOrders
                  .filter(order => order.deliver_status === 'onDeliver')
                  .map((order, index) => (
                  <div key={order.order_item_id} style={order_container}>
                      <Row className='p-5' >
                          <Col className='col-auto'>
                              <Image src={`http://localhost/hurb/${order.product_img}`} style={product_size}></Image>
                          </Col>
                          <Col className='d-flex flex-column'>
                              <span>{order.product_name}</span>
                              <div className="below d-flex gap-3">
                                  <span>{`Quantity: ${order.quantity}`}</span>
                                  <span>{`Variation: Black, ${order.size}`}</span>
                                  <span>{`P${order.unit_price}`}</span>
                              </div>
                          </Col>
                          <Col className='d-flex justify-content-end align-items-end'>
                              <span>{`Order Total: ${order.totalPayable}`}</span>
                          </Col>
                      </Row>
                      <Row className='d-flex align-items-center justify-content-center'>
                          <Col lg={11}>
                              <hr className="border border-dark border-1 opacity-40"/>
                          </Col>
                      </Row>
                      <Row>
                          <Col className='d-flex justify-content-end mx-5 mb-3'>
                              <Button variant="dark">Order Received</Button>
                          </Col>
                      </Row>
                  </div> 
                  ))}
              </Container>
                }
                {activeKey === "received" &&
                    <Container fluid className='d-flex flex-column gap-4'>
                    {myOrders
                    .filter(order => order.deliver_status === 'received')
                    .map((order, index) => (
                    <div key={order.order_item_id} style={order_container}>
                        <Row className='p-5' >
                            <Col className='col-auto'>
                                <Image src={`http://localhost/hurb/${order.product_img}`} style={product_size}></Image>
                            </Col>
                            <Col className='d-flex flex-column'>
                                <span>{order.product_name}</span>
                                <div className="below d-flex gap-3">
                                    <span>{`Quantity: ${order.quantity}`}</span>
                                    <span>{`Variation: Black, ${order.size}`}</span>
                                    <span>{`P${order.unit_price}`}</span>
                                </div>
                            </Col>
                            <Col className='d-flex justify-content-end align-items-end'>
                                <span>{`Order Total: ${order.totalPayable}`}</span>
                            </Col>
                        </Row>
                        <Row className='d-flex align-items-center justify-content-center'>
                            <Col lg={11}>
                                <hr className="border border-dark border-1 opacity-40"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                <Button variant="dark" style={ratebuyBtn}>Rate</Button>
                                <Button variant="secondary" style={ratebuyBtn}>Buy Again</Button>
                            </Col>
                        </Row>
                    </div> 
                    ))}
                </Container>
                }
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  )
}

export default MyOrder