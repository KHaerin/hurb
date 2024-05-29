import React, { useState, useEffect } from 'react';
import * as SlIcons from 'react-icons/sl';
import axios from 'axios';

function ListOrders() {
    
    const [orders, setOrders] = useState([]);
    const [sellerID, setSellerId] = useState('');

    useEffect(() => {
        const sellerIdFromStorage = localStorage.getItem('sellerId');
        if (sellerIdFromStorage) {
            setSellerId(sellerIdFromStorage);
        }
    }, []); 

    useEffect(() => {
        if (sellerID) {
            fetchCustomer();
        }
    }, [sellerID]); 

   const fetchCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost/hurb/Seller/GetOrders.php?seller_id=${sellerID}`);
            // Process the response data to split concatenated fields into arrays
            const processedOrders = response.data.map(order => ({
                ...order,
                color_ids: order.color_ids.split(','),
                deliver_statuses: order.deliver_statuses.split(','),
                order_item_ids: order.order_item_ids.split(','),
                product_quantities: order.product_quantities.split(','),
                product_img_ids: order.product_img_ids.split(','),
                size_ids: order.size_ids.split(','),
                sizes: order.sizes.split(','),
                images: order.product_img_urls.split(',')
               
            }));
            setOrders(processedOrders);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        console.log(orders);
    })
    
    const updateOrderStatus = async (orderItemIds, newStatus) => {
        try {
            await axios.post(`http://localhost/hurb/Seller/updateStatus.php`, {
                order_item_ids: orderItemIds, // Ensure correct key name here
                new_status: newStatus
            });
            fetchCustomer();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

   

    const handleStatusUpdate = (orderItemIds, newStatus) => {
        updateOrderStatus(orderItemIds, newStatus);
    };

    const imgStyle = {
        width: '80px',
        height: '80px'
    }

    return (
        <div className="container-fluid" id="account-container">
            <div className="row gap-5">
                <div className="col">
                    <div className="container-fluid">
                        {orders.length === 0 ? 
                            <h1>No Order Available sabi ni idol karl</h1>
                        : 
                        <div className="table-container" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                            <table className="table accordion accordion-flush" id="accordionFlushExample">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Recipient Name</th>
                                        <th scope="col">Date Ordered</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Update Status</th>
                                        <th scope='col'>View Order</th>
                                    </tr>
                                </thead>
                                {orders.map((order, index) => (
                                    <tbody key={index} className='accordion-item'>
                                        <tr className='accordion-header'>
                                            <th>{order.order_id}</th>
                                            <td>{order.recipient_name}</td>    
                                            <td>{order.date_bought}</td>    
                                            <td>{order.deliver_statuses[0]}</td>     
                                            <td>
                                                <div className="btn-group dropend">
                                                    <button className='btn btn-dark dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false"><SlIcons.SlOptionsVertical></SlIcons.SlOptionsVertical></button>
                                                    <ul className='dropdown-menu'>
                                                        {order.deliver_statuses[0] === 'Received' ? 
                                                            <li>
                                                                <a href="#" className='dropdown-item' onClick={(e) => e.preventDefault()} disabled>
                                                                    To Receive
                                                                </a>
                                                            </li>
                                                        : 
                                                            <li>
                                                                <a href="#" className='dropdown-item' onClick={() => handleStatusUpdate(order.order_item_ids, 'To Receive')}>
                                                                    To Receive
                                                                </a>
                                                            </li>
                                                        }
                                                        <li><a href="#" className='dropdown-item' onClick={() => handleStatusUpdate(order.order_item_ids, 'Received')}>Received</a></li>
                                                        {/* <li><a href="#" className='dropdown-item' onClick={() => handleStatusUpdate(order.order_item_ids, 'Cancel')}>Cancel</a></li>  */}
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <button className='accordion-button collapsed' type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="7">
                                                <div id={`collapse${index}`} className='accordion-collapse collapse' data-bs-parent="#accordionFlushExample">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col">
                                                                <h1>Products in this order:</h1>
                                                                <ul id='list'>
                                                                    {order.order_item_ids.map((itemId, itemIndex) => (
                                                                        <li key={itemIndex}>
                                                                            <img  style={imgStyle} src={`http://localhost/hurb/${order.images[itemIndex]}`}  alt="" />
                                                                            Item ID: {itemId}, 
                                                                            Size: {order.sizes[itemIndex]}, 
                                                                            Color ID: {order.color_ids[itemIndex]}, 
                                                                            Quantity: {order.product_quantities[itemIndex]}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}

                            </table> 
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOrders;
