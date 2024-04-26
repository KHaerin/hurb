import React, { useState, useEffect } from 'react';

function ListOrders() {
    
    const[orders, setOrders] = useState([]);

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
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Sales</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead> 
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