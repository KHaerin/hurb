import axios from 'axios';
import { useEffect } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faAddressBook} from '@fortawesome/free-regular-svg-icons';
import Coupon from '../icons/account-icon/coupon.png';
import Padlock from '../icons/account-icon/padlock.png';
import ShopCart from '../icons/account-icon/shopping-cart.png';
import { ToastContainer, toast } from 'react-toastify';


export default function accMenu({handleLinkClick, activeLink, isSeller}){
    const navigate = useNavigate();
    const handleNavigateAndReload = async () => {

    try{
        const getUserId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost/hurb/register/getApplication.php?user_id=${getUserId}`);
        const dataFetch = response.data;
        const getUserIdDB = dataFetch.user_id;
        const getVerified = dataFetch.isVerified;
        if(getUserIdDB === getUserId && getVerified === '1'){
            toast.warning('Your application is under review by the admin');
        }else{
            navigate("/regSeller");
            window.location.reload();
        }

    }catch(error){
        console.log('Error fetching data:', error);
    }   
}
    return(
        <>
         <div className="dashboard-menu">
            <ul className="navbar-nav gap-2">
                <li className="nav-item d-flex align-items-center gap-2 text-center">
                <FontAwesomeIcon icon={faUser} id="nav-icons"/>
                    <Link
                        to="#account"
                        className={`nav-link ${activeLink === '#account' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('#account')}
                    >
                        Profile
                    </Link>
                </li>
                <li className="nav-item d-flex align-items-center gap-2 text-center">
                <FontAwesomeIcon icon={faAddressBook} id="nav-icons"/>
                    <Link
                        to="#account/addressBook"
                        className={`nav-link ${activeLink === '#account/addressBook' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('#account/addressBook')}
                    >
                        Address Book
                    </Link>
                </li>
                <li className="nav-item d-flex align-items-center gap-2 text-center">
                    <img src={Padlock} alt="" id="nav-icons"/>
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === '#changePassword' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('#changePassword')}
                    >
                        Change Password
                    </Link>
                </li>
                <li className="nav-item d-flex align-items-center gap-2 text-center">
                    <img src={ShopCart} alt="" id="nav-icons"/>
                    <Link
                        to="#account/myOrder"
                        className={`nav-link ${activeLink === '#account/myOrder' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('#account/myOrder')}
                    >
                        Order History
                    </Link>
                </li>
                <li className="nav-item d-flex align-items-center gap-2 text-center">
                    <img src={Coupon} alt="" id="nav-icons"/>
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'myVouchers' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('#myVouchers')}
                    >
                        My Vouchers
                    </Link>
                </li>
                {isSeller === '0' && 
                    <li className="nav-item">
                        <Link onClick={handleNavigateAndReload} className="nav-link" id="advertise">Advertise your brand now!</Link>
                     </li>
                }
                
            </ul>
        </div>
        <ToastContainer position="top-center" limit={1}/>
        </>
    )
}