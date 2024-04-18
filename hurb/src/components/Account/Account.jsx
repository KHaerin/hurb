import './Account.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AccMenu from './accMenu';
import Profile from './AccountMenu/Profile';
import AddressBook from './AccountMenu/AddressBook';  // Import the components you want to conditionally render
import AddAddress from './AccountMenu/AddAddress';

export default function Account(){

    const[fName, setFirstName] = useState('');
    const[lName, setLastName] = useState('');
    const[userName, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[phoneNum, setPhoneNum] = useState('');
    const[password, setPassword] = useState('');
    const[profile_picture, setProfilePic] = useState('');
    const userId = localStorage.getItem('userId');

    const [activeLink, setActiveLink] = useState('profile');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        fetchAccount();
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const fetchAccount = async () => {
        try{
            const getAcc = await axios.get(`http://localhost/hurb/login/login.php?users_id=${userId}`);
            const userDBFetch = getAcc.data[0];
            const fName = userDBFetch.firstname;
            const lName = userDBFetch.lastname;
            const userName = userDBFetch.userName;
            const email = userDBFetch.email;
            const phoneNum = userDBFetch.phonenumber;
            const password = userDBFetch.email;
            const profile_picture = userDBFetch.profile_picture;

            setFirstName(fName);
            setLastName(lName);
            setUserName(userName);
            setEmail(email);
            setPhoneNum(phoneNum);
            setPassword(password);
            setProfilePic(profile_picture);

        }catch(error){
            console.error('Error fetch: ', error);
        }
    }

   
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return(
    <>
    {isLoggedIn && 
        <div className="container-fluid" id="account-container">
            <div className="row">
                <div className="col-auto" id="dashboard-container"> 
                    <div className="container dashboard">
                        <div className="image-cont d-flex align-items-center gap-3 mb-4">
                            <img src={`http://localhost/hurb/${profile_picture}`} alt="profile" className="d-flex" id="profile-picture" />
                            <span>{lName}, {fName}</span>
                        </div>
                        <hr className="border border-dark border-1 opacity-40" id="hr"/>
                            <AccMenu handleLinkClick={handleLinkClick} activeLink={activeLink}></AccMenu>
                    </div>
                </div>
            <div className="col" id="middle-container">
                {activeLink === 'profile' && <Profile />}
                {activeLink === 'addressBook' && <AddressBook  handleLinkClick={handleLinkClick} />}
                {activeLink === 'addAddress' && <AddAddress handleLinkClick={handleLinkClick}/>}                
                {activeLink === 'changePassword' && <ChangePassword />}
                {activeLink === 'orderHistory' && <OrderHistory />}
                {activeLink === 'myVouchers' && <MyVouchers />}
            </div>
        </div>
   </div>
    }
       
    </>
    )
}