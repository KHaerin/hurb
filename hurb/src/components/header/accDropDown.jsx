import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserIcon from '../icons/header-icon/user.png';

export default function accDropDown(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const history = useNavigate();

   
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const userId = localStorage.getItem('userId');
        fetchAccountImg();
        if(userId === '1'){
            setIsAdmin(true);
        }
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
        
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        history("/");
        window.location.reload();
    }

    const handleAdminPage = () => {
        history("/login/admin");
        window.location.reload();
    }

    const[profile_picture, setProfilePic] = useState(null);

    const fetchAccountImg = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const getAcc = await axios.get(`http://localhost/hurb/login/login.php?users_id=${userId}`);
            const checkSeller = await axios.get(`http://localhost/hurb/SellerApplication/Application.php?users_id=${userId}`);
    
            if (checkSeller && checkSeller.data && checkSeller.data.length > 0) {
                const fetchSeller = checkSeller.data[0];
                setIsSeller(fetchSeller.isAccepted);
            }
    
            const userDBFetch = getAcc.data[0];
            const profile_picture = userDBFetch.profile_picture;
            setProfilePic(profile_picture);
        } catch (error) {
            console.error('Error fetch: ', error);
        }
    }

    const userId = localStorage.getItem('userId');
    return(
        <>
             <li className="nav-item dropdown">
                                
                                <Link className="nav-link dropdown-toggle" id="headerLinks" role="button" data-bs-toggle="dropwdown" aria-expanded="false">
                                {profile_picture ?
                                            <img src={`http://localhost/hurb/${profile_picture}`} alt="" id="accIcon-logged" />
                                            :
                                            <img src={UserIcon} alt="" id="accIcon-logged" />

                                 }
                                    </Link>
                                 <ul className='dropdown-menu dropdown-menu-hover'>
                                {!isAdmin && 
                                    <li><Link to="/account" className='dropdown-item'>Account</Link></li>
                                }
                                 
                                 {isAdmin && 
                                 <li>
                                    <a onClick={handleAdminPage} className='dropdown-item' id="adminDrop">Admin</a>
                                 </li>}
                                 {isSeller === '1' &&
                                     <li>
                                        <Link to="/seller" className='dropdown-item'>Seller's Profile</Link>
                                    </li>
                                }
                            
                         <li><a onClick={handleLogout} className='dropdown-item' id="logout">Logout</a></li>
                     </ul>
                 </li>         
        </>
    )
}