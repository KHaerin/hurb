import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import { FaTrashCan } from "react-icons/fa6";
import { Container, Row, Col, Nav, Image, Button} from 'react-bootstrap';

function MyOrder() {

    const [activeKey, setActiveKey] = useState("All");

    const handleSelect = (eventKey) => {
      setActiveKey(eventKey);
    };

    const[myOrders, setOrder] = useState([]);

    useEffect(() => console.log('orders: ',myOrders));

    useEffect(() => {
        const getAddressBook = async () => {
            try{
                const user_id = localStorage.getItem('userId');
                const url = await axios.get(`http://localhost/hurb/CustomerOrder/MyOrder.php?user_id=${user_id}`);
                const orders = url.data;
                setOrder(orders);
            }catch(error){
                console.error('myOrder error: ',error);
            }
        };
        getAddressBook();
    }, [])

    const handleCancelOrder = async (order_item_id, price, qty, total, orderId) => {
        try{
            const fData = new FormData();
            console.log(order_item_id);
            fData.append('order_item_id', order_item_id);
            fData.append('price', price);
            fData.append('qty', qty);
            fData.append('total', total);
            fData.append('order_id', orderId)

            const response = await axios.post("http://localhost/hurb/CustomerOrder/CancelOrder.php", fData);
            window.location.reload();
            console.log(response);
        }catch(error){
            console.error(error);
        }
        console.log(order_item_id);
    }


    const order_container = {
        backgroundColor: '#F8F8F8'
    }

    const product_size = {
        width: '10rem'
    }

    const ratebuyBtn = {
        width: '5rem'
    }

    const ratebtn = {
        width: '10rem'
    }

    const trashIcon = {
        fontSize: '1.2rem'
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
                {myOrders.length >= 1 ? 
                <> 
                    {activeKey === "All" &&
                   <Container fluid className='d-flex flex-column gap-4'>
                   {myOrders.reduce((acc, order, index) => {
                       const lastIndex = acc.length - 1;
                       if (lastIndex < 0 || acc[lastIndex][0].order_id !== order.order_id) {
                           acc.push([order]);
                       } else {
                           acc[lastIndex].push(order);
                       }
                       return acc;
                   }, []).map((orderGroup, groupIndex) => {
                       const groupTotal = orderGroup.reduce((total, order) => order.totalPayable);
                       return (
                           <div key={groupIndex} style={order_container}>
                               {orderGroup.map((order, index) => (
                                   <React.Fragment key={order.order_item_id}>
                                   <Row className='px-4 pt-4'>
                                       {order.deliver_status === 'ship' &&
                                           <span>Seller is preparing to ship.</span>
                                       }
                                       {order.deliver_status === 'received' &&
                                           <span>Delivered</span>
                                       }
                                       {order.deliver_status === 'onDeliver' &&
                                           <span>To Receive</span>
                                       }
                                       {order.payed_status === 'COMPLETED' &&
                                           <span>{`(Payed)`}</span>
                                       }
                                   </Row>
                                   <Row className='p-5'>
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
                                           <span>Subtotal: {order.unit_price * order.quantity}</span>
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
                                           <>
                                            <Button variant="danger" style={ratebuyBtn} onClick={() => handleCancelOrder(order.order_item_id, order.unit_price, order.quantity, order.totalPayable, order.order_id)}>
                                                    <FaTrashCan style={trashIcon}></FaTrashCan>
                                            </Button> 
                                           </>
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
                               </React.Fragment>
                               ))}
                               <Row>
                                    <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                        <Button variant="dark" style={ratebtn} disabled>Order Received</Button>
                                    </Col>
                               </Row>
                               <Row>
                                   <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                        <span>{`Total Order: ${groupTotal.toLocaleString()}`}</span>
                                   </Col>
                               </Row>
                           </div>
                       );
                   })}
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
                            <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                <Button variant="danger" style={ratebuyBtn}>Cancel</Button>                
                                <Button variant="dark" style={ratebtn} disabled>Order Received</Button>
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
                </>: <h1>You have yet to receive your first order.</h1>}
                
              
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  )
}

export default MyOrder