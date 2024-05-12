import React, { useState, useEffect } from 'react';

function ListOrders() {
    
    const[orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders('xd');
    })

  return (
    <div className="container-fluid" id="account-container">
        <div className="row gap-5">
        <div className="col">
        <div className="container-fluid">
            {orders.length === 0 ? 
                <h1>No Order Available sabi ni idol karl</h1>
            : 
            <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Size ID</th>
                        <th scope="col">Color ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><span>1</span></th>
                        <td>1</td>    
                        <td>1</td>    
                        <td>1</td>    
                        <td>2</td>    
                        <td>
                            <span className='btn btn-dark'>three dots for options :O</span>
                        </td>   
                    </tr>                 
                </tbody> 
            </table> 
            </>
            }
            
        </div>
        </div>
        </div>
    </div>
  )
}

export default ListOrders