import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './header.css';
import AccountIcon from '../../components/icons/header-icon/user.png';
import HeaderAcc from './accDropDown';
import AddCart from '../addCart/addCart';

import HurbLogo1 from '../hurb-logo/hurb logo files-01.png';
import HurbLogo2 from '../hurb-logo/hurb logo files-02.png';
import HurbLogo3 from '../hurb-logo/hurb logo files-03.png';
import HurbLogo4 from '../hurb-logo/hurb logo files-04.png';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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

    const goMain = () => {
        window.location.href = "/shop";
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
                            <li className="nav-item">
                                <Link
                                    onClick={goMain}
                                    className="nav-link active dropdown-toggle"
                                    id="headerLinks"
                                    role="button"
                                >
                                    Shop
                                </Link>
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
                                    <Link to="#" className="nav-link dropdown-toggle pointers-events-none" id="headerLinks" role="button" data-bs-toggle="dropwdown" aria-expanded="false" aria-disabled><img src={AccountIcon} alt="" id="accIcon" /></Link>
                                    <ul className="dropdown-menu dropdown-menu-hover">
                                        <li className="dropdown-item"><Link to="/login" className='nav-link' >Login</Link></li>
                                        <li className='dropdown-item'><Link to="/register" className='nav-link'>Sign Up</Link></li>
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
