import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import * as VscIcons from 'react-icons/vsc';
import HeaderAcc from './accDropDown';
import AddCart from '../addCart/addCart';

import HurbLogo1 from '../hurb-logo/hurb logo files-01.png';
import HurbLogo2 from '../hurb-logo/hurb logo files-02.png';
import HurbLogo3 from '../hurb-logo/hurb logo files-03.png';
import HurbLogo4 from '../hurb-logo/hurb logo files-04.png';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/hurb/products.php');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); 

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const admin_user = localStorage.getItem('userId');
        if (admin_user === '1') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const uniqueSubCategories = [...new Set(products.map(product => product.product_sub_category))];

    const loc = useLocation();

    const subCateg = (category) => {
        console.log(category);
         const path = '/shop';
         const hash = category.hash;
        const pathhash = path + hash;
        console.log(pathhash);
        window.location.href= (pathhash);
    
    }

    const goMain = () => {
        window.location.href = "/shop";
    }

    const linkStyle = {
        color: '#000000',
    }

    return (
        <>
            <div className="container-fluid z-3">
                <div className="row">
                    <div className="col-lg-4 col-md-5 d-flex justify-content-center align-items-center">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" id="headerLinks">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    onClick={goMain}
                                    className="nav-link active dropdown-toggle"
                                    id="headerLinks"
                                    role="button"
                                >
                                    Shop
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-hover">
                                    {uniqueSubCategories.length === 0 ? '' : 
                                        <>
                                        {uniqueSubCategories.map((categ, index) => (
                                            <li className="dropdown-item" key={index}><Link to={`#${categ}`} onClick={(e) => subCateg(loc)}  className='nav-link' style={linkStyle}>{categ}</Link></li>
                                         ))}
                                        </>
                                    }
                                    
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link" id="headerLinks">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link" id="headerLinks">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-4 d-flex justify-content-center">
                        <img src={HurbLogo4} alt="" id="hurb-logo" />
                    </div>
                    <div className="col-lg-3 d-flex justify-content-end align-items-center header-container">
                        <ul className="nav justify-content-end">
                            {isLoggedIn && (
                                <HeaderAcc />
                            )}
                            {!isLoggedIn && (
                                <li className='nav-item dropdown'>
                                    <Link to="#" className="nav-link dropdown-toggle pointers-events-none" id="headerLinks" role="button" data-bs-toggle="dropwdown" aria-expanded="false" aria-disabled><VscIcons.VscAccount id="accIcon"/></Link>
                                    <ul className="dropdown-menu dropdown-menu-hover">
                                        <li className="dropdown-item"><Link to="/login" className='nav-link' style={linkStyle}>Login</Link></li>
                                        <li className='dropdown-item'><Link to="/register" className='nav-link' style={linkStyle}>Sign Up</Link></li>
                                    </ul>

                                </li>
                            )}
                            <li className="nav-item">
                                {!isAdmin && (
                                    <AddCart />
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </div>   
        </>
    )
}
