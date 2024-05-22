import React, { useState, useEffect } from 'react';
import * as SlIcons from 'react-icons/sl';
import axios from 'axios';

function ListOrders() {
    
    const[orders, setOrders] = useState([]);


    useEffect(() => {
        fetchCustomer();
    }, []);

    useEffect(() => {
        console.log('orders: ', orders);
    })

    const fetchCustomer = async() => {
        try {
            const response = await axios.get('http://localhost/hurb/Seller/GetOrders.php');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

  return (
    <div className="container-fluid" id="account-container">
        <div className="row gap-5">
        <div className="col">
        <div className="container-fluid">
            {orders.length === 0 ? 
                <h1>No Order Available sabi ni idol karl</h1>
            : 
            <>
            <table className="table accordion accordion-flush" id="accordionFlushExample">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Size ID</th>
                        <th scope="col">Color ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                        <th scope='col'>View Order</th>
                    </tr>
                </thead>
                <tbody className='accordion-item'>
                    <tr className='accordion-header'>
                        {orders.map((order, index) => (
                           <>
                             <th key={index}><span>1</span></th>
                            <td>{order.customer_id}</td>    
                            <td>1</td>    
                            <td>1</td>    
                            <td>2</td>    
                            <td>
                                <button className='btn btn-dark'><SlIcons.SlOptionsVertical></SlIcons.SlOptionsVertical></button>
                            </td>
                            <td>
                                <button className='accordion-button collapsed' type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"></button>
                            </td>   
                           </> 
                        ))}
                       
                    </tr>                 
                </tbody> 
            </table> 

            <div id="flush-collapseOne" className='accordion-collapse collapse' data-bs-parent="#accordionFlushExample">
                {orders.map((order, index) => (
                    <div className="container" key={index}>
                        <div className="row">
                            <div className="col">
                                <h1>addbook: {order.addBook_id}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </>
            }
            
        </div>
        </div>
        </div>
    </div>
  )
}

export default ListOrders