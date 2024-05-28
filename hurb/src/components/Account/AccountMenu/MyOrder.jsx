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

    const handleCancelOrder = async (order_item_id, price, qty, total, orderId, sizeId, colorId, productId) => {
        try{
            const fData = new FormData();
            console.log(order_item_id);
            fData.append('order_item_id', order_item_id);
            fData.append('price', price);
            fData.append('qty', qty);
            fData.append('total', total);
            fData.append('order_id', orderId)
            fData.append('color_id', colorId)
            fData.append('size_id', sizeId)
            fData.append('product_id', productId)

            const response = await axios.post("http://localhost/hurb/CustomerOrder/CancelOrder.php", fData);
            console.log(response.data);
            window.location.reload();
        }catch(error){
            console.error(error);
        }
        console.log(order_item_id);
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
              <Nav.Link eventKey="ToShip" active={activeKey === "ship"}>To Ship</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="onDeliver" active={activeKey === "onDeliver"}>To Receive</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="received" active={activeKey === "received"}>Received</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Container fluid>
            <Row>
              <Col >
              <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                {myOrders.length >= 1 ? 
                <> 
                    {activeKey === 'All' && <AllOrders myOrders={myOrders} handleCancelOrder={handleCancelOrder} activeKey={activeKey} />}
                    {activeKey === 'ToShip' && <ToShip myOrders={myOrders} handleCancelOrder={handleCancelOrder} activeKey={activeKey} />}
                    {activeKey === 'onDeliver' &&  <OnDeliver myOrders={myOrders} />}
                    {activeKey === 'received' && <AllOrders myOrders={myOrders} handleCancelOrder={handleCancelOrder} />}
                </>
                : 
                <h1>You have yet to receive your first order.</h1>}
              </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}


function AllOrders({ myOrders, handleCancelOrder }) {
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
                const groupTotal = parseFloat(orderGroup.reduce((total, order) => total + parseFloat(order.totalPayable), 0)).toFixed(2);
                return (
                    <div key={groupIndex} style={order_container}>
                        {orderGroup.map((order, index) => (
                            <React.Fragment key={order.order_item_id}>
                                <Row className='px-4 pt-4'>
                                    <Col>
                                        {order.deliver_status === 'ship' &&
                                            <span>Seller is preparing to ship.</span>
                                        }
                                        {order.deliver_status === 'received' &&
                                            <span>Delivered</span>
                                        }
                                        {order.deliver_status === 'On Deliver' &&
                                            <span>To Receive</span>
                                        }
                                        {order.payed_status === 'COMPLETED' &&
                                            <span>{`(Payed)`}</span>
                                        }
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                    <span>Date ordered: {order.date_bought}</span>
                                    </Col>
                                    
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
                                        <hr className="border border-dark border-1 opacity-40" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                        {order.deliver_status === "ship" &&
                                            <>
                                                <Button variant="danger" style={ratebuyBtn} onClick={() => handleCancelOrder(order.order_item_id, order.unit_price, order.quantity, order.totalPayable, order.order_id, order.size_id, order.color_id, order.product_id)}>
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
                            {/* <Col>
                                <span>{`${dateOrdered}`}</span>
                            </Col> */}
                            <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                <span>{`Total Order: ${groupTotal}`}</span>
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </Container>
    )
}

function ToShip({myOrders, handleCancelOrder, activeKey}){
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
            {activeKey === "ToShip" &&
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
                    const groupTotal = parseFloat(orderGroup.reduce((total, order) => total + parseFloat(order.totalPayable), 0)).toFixed(2);
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
                                            <Button variant="danger" style={ratebuyBtn} onClick={() => handleCancelOrder(order.order_item_id, order.unit_price, order.quantity, order.totalPayable, order.order_id, order.size_id, order.color_id, order.product_id)}>
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
                                        <span>{`Total Order: ${groupTotal}`}</span>
                                   </Col>
                               </Row>
                           </div>
                       );
                   })}
               </Container>
                }   
        </>

    )
}

function OnDeliver({myOrders}){
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
        <Container fluid className='d-flex flex-column gap-4'>
            {myOrders
                .filter(order => order.deliver_status === 'On Deliver')
                .reduce((acc, order, index) => {
                    const lastIndex = acc.length - 1;
                    if (lastIndex < 0 || acc[lastIndex][0].order_id !== order.order_id) {
                        acc.push([order]);
                    } else {
                        acc[lastIndex].push(order);
                    }
                    return acc;
                }, [])
                .map((orderGroup, groupIndex) => {
                    return (
                        <div key={groupIndex} style={order_container}>
                            {orderGroup.map((order, index) => (
                                <React.Fragment key={order.order_item_id}>
                                    <Row className='px-4 pt-4'>
                                        <span>To Receive</span>
                                    </Row>
                                    <Row className='p-5'>
                                        <Col className='col-auto'>
                                            <Image src={`http://localhost/hurb/${order.product_img}`} style={product_size} />
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
                                            <hr className="border border-dark border-1 opacity-40" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='d-flex justify-content-end mx-5 mb-3 gap-3'>
                                            <Button variant="dark">Order Received</Button>
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
                                    <span>{`Total Order: ${parseFloat(myOrders.reduce((total, order) => parseFloat(order.totalPayable), 0)).toFixed(2)}`}</span>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            {myOrders.filter(order => order.deliver_status === 'onDeliver').length === 0 && <h1>No Items to be delivered</h1>}
        </Container>
    )
}

export default MyOrder