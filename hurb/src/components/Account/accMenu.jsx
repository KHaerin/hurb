import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { accMenuData } from './accMenuData';
import './Account.css';


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
                {accMenuData.map((menu, index) => {
                    return(
                        <li key={index} className={menu.cName}>
                            <Link id="acc-menu-link" className='d-flex gap-2 align-items-center' to={menu.path} onClick={() => {handleLinkClick(menu.path)}}>
                                {menu.icon}
                                <span id="acc-menu-title">{menu.title}</span>
                            </Link>
                        </li>
                    )
                })}
                
                 {isSeller === '0' && 
                    <li className="nav-item">
                        <Link onClick={handleNavigateAndReload} className="nav-link" id="advertise">Advertise your brand now!</Link>
                    </li>
                }
            </ul>
        </div>
        </>
    )
}


