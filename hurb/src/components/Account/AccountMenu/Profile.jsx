import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
export default function Profile( { handleLinkClick } ){
    
    const[fName, setFirstName] = useState('');
    const[lName, setLastName] = useState('');
    const[userName, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[phoneNum, setPhoneNum] = useState('');
    const[password, setPassword] = useState('');
    const[profile_picture, setProfilePic] = useState('');
    const userId = localStorage.getItem('userId');

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

   
    const handleChangeProfile = () => {
        if (!profile_picture) {
            alert('Please provide an image');
        } else {
            const formData = new FormData();
            formData.append('profile_picture', profile_picture);

            axios.post(`http://localhost/hurb/changeProfile.php?users_id=${userId}`, formData)
                .then(response => {
                    console.log(response.data); 
                    setProfilePic('');
                    window.location.reload();
                    
                })
                .catch(error => {
                    console.error('Error uploading profile picture:', error);
                });
        }
    }

    return(
        <>
            <div className="container pt-2 px-5" id="dashboardBox">
                    <div className="row">
                        <div className="col-auto col-lg-7 col-md-6 mb-5">
                            <div className="titleText d-flex flex-column mt-4 mb-3">
                                <h1 className="d-flex align-items-center">My Profile</h1>
                                <hr className="border border-dark border-1 opacity-40" id="hr2"/>
                            </div>

                            <div className="profile-field-container">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingName" value={fName} onChange={(e) => setFirstName(e.target.value)} placeholder="Name" />
                                    <label htmlFor="floatingName">Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingUsername" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
                                    <label htmlFor="floatingUsername">Username</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingPhone" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="Phone Number" />
                                    <label htmlFor="floatingPhone">Phone Number</label>
                                </div>

                                <div className="">
                                    <Link to="#changePassword" onClick={() => handleLinkClick('#changePassword')}>Change Password</Link>
                                </div>
                                
                                <div className="d-flex justify-content-end align-items-end">
                                    <button type="button" className="btn btn-dark" onClick={handleChangeProfile}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 d-flex flex-column justify-content-center mt-5">
                            <div className="container d-flex flex-column justify-content-center align-items-center p-5" id="profile-container-img">
                                <img src={`http://localhost/hurb/${profile_picture}`} alt="profile" className="d-flex mb-3" id="profile-picture"/>
                                <div className="mb-3">
                                    <label htmlFor="profileFileInput" className="btn btn-outline-dark">
                                        Choose File
                                    </label>
                                    <input 
                                        className="form-control visually-hidden"
                                        type="file" 
                                        id="profileFileInput" 
                                        name="profile_picture"  
                                        onChange={(e) => setProfilePic(e.target.files[0])}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}