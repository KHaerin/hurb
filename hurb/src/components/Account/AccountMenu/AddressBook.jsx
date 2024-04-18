import AccMenu from '../accMenu';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../Account.css';
export default function AddressBook({handleLinkClick}){

    const[fName, setFirstName] = useState('');
    const[lName, setLastName] = useState('');
    const[profile_picture, setProfilePic] = useState('');
    const userId = localStorage.getItem('userId');
    

    useEffect(() => {
        fetchAccount();
    }, []);

    const fetchAccount = async () => {
        try{
            const getAcc = await axios.get(`http://localhost/hurb/login/login.php?users_id=${userId}`);
            const userDBFetch = getAcc.data[0];
            const fName = userDBFetch.firstname;
            const lName = userDBFetch.lastname;
            const profile_picture = userDBFetch.profile_picture;

            setFirstName(fName);
            setLastName(lName);
            setProfilePic(profile_picture);

        }catch(error){
            console.error('Error fetch: ', error);
        }
    }

    const handleAddAddressClick = () => {
        handleLinkClick('addAddress');
    };

    const[addressDetails, setAddressDetails] = useState([]);

    useEffect(() => {
        const getAddressBook = async () => {
            try{
                const user_id = localStorage.getItem('userId');
                const url = await axios.get(`http://localhost/hurb/AddressBook/getAddress.php?user_id=${user_id}`);
                const addressDetails = url.data;
                setAddressDetails(addressDetails);
            }catch(error){
                console.error(error);
            }
        };
        getAddressBook();
    }, [])

    const handleEditBtn = (addBook_id) => {
        localStorage.setItem('addBook_id', addBook_id);
        handleLinkClick('addAddress');
    }


    return(
        <>
    <div className="container-fluid" id="account-container">
        <div className="row">
            <div className="col">
                <div className="container" id="address-container">
                    <div className="row">
                        <div className="col">
                            <h1>Address Book</h1>
                            <hr className="border border-dark border-1 opacity-40"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Postcode</th>
                                        <th scope="col">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addressDetails.map((add, index) => (
                                         <tr key={add.addBook_id}>
                                         <td id="recipient-table">{add.recipient_name}</td>
                                         <td className='text-wrap' id="address-table">{add.address}</td>
                                         <td>{add.zipcode}</td>
                                         <td>{add.mobile_number}</td>
                                         <td><button className='btn btn-primary' onClick={() => handleEditBtn(add.addBook_id)}>Edit</button></td>
                                     </tr>
                                    ))}
                                </tbody> 
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-end align-items-center">
                            <button onClick={handleAddAddressClick} className="btn btn-dark" id="addressBtn">+ ADD NEW ADDRESS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
        </>
    )
}