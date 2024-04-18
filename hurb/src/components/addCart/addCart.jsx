import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function AddCart() {

    const[tracks, setTrack] = useState([]);
    const[totalAmount, setTotalAmount] = useState('');

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
        fetchCartProducts();

    }, []);

    const fetchCartProducts = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost/hurb/track_select.php?user_id=${user_id}`);
            const dataFetch = response.data;
            let total = 0;
            const processedData = await Promise.all(dataFetch.map(async (item) => {
                const productResponse = await axios.get(`http://localhost/hurb/products.php?product_id=${item.product_id}`);
                const productData = productResponse.data[0]; 
                const totalAmount = item.product_qty * productData.product_price;
                total += totalAmount;
                return { ...item, ...productData, totalAmount };
            }));
            setTotalAmount(total);
            setTrack(processedData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const navigate = useNavigate();

    const handleCartClick = () => {
        if(isLoggedIn){
            navigate('/shop/cart');
        }else if (!isLoggedIn){
            alert('Log in first');
            navigate('/login');
        }
    };

    return (
        <button type="button" onClick={handleCartClick} className="btn position-relative d-flex align-items-center">
        <FontAwesomeIcon icon={faCartShopping} id="cartIcon"></FontAwesomeIcon>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {tracks.length}
          <span className="visually-hidden"></span>
        </span>
      </button>
    );
}