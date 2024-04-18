import axios from 'axios';
import {Link , useNavigate} from 'react-router-dom';

export default function accMenu({handleLinkClick, activeLink}){
    const navigate = useNavigate();
    const handleNavigateAndReload = async () => {

    try{
        const getUserId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost/hurb/register/getApplication.php?user_id=${getUserId}`);
        const dataFetch = response.data;
        const getUserIdDB = dataFetch.user_id;
        const getVerified = dataFetch.isVerified;
        if(getUserIdDB === getUserId && getVerified === '1'){
            alert('Please wait for the admin to confirm your application.');
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
                <li className="nav-item">
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('profile')}
                    >
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'addressBook' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('addressBook')}
                    >
                        Address Book
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'changePassword' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('changePassword')}
                    >
                        Change Password
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'orderHistory' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('orderHistory')}
                    >
                        Order History
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="#"
                        className={`nav-link ${activeLink === 'myVouchers' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('myVouchers')}
                    >
                        My Vouchers
                    </Link>
                </li>
                <li className="nav-item">
                    <Link onClick={handleNavigateAndReload} className="nav-link" id="advertise">Advertise your brand now!</Link>
                 </li>
            </ul>
        </div>
           
        </>
    )
}