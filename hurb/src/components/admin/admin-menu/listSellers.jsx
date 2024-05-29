import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'


export default function listSellers(){

    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });

    const [regSeller, setRegistered] = useState([]);

    useEffect(() => {
        const getSales = async () => {
            try {
                const response = await axios.get('http://localhost/hurb/SellerApplication/Application.php');
                const regApplicants = response.data.filter(applicant => applicant.isAccepted === "1");
    
                console.log('regApp: ', regApplicants);

                setRegistered(regApplicants);
    
        
            } catch (error) {
                console.error('myOrder error: ', error);
            }
        };
        getSales();
    }, [])


    return(
        <>
            <>  
        {isAdmin === '1' ? 
            <>
                 <div className="container">
                    <div className="row mb-4">
                        <div className="col">
                            <div className="col">
                                <h1>List of Seller</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Business Name</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regSeller.map((acc, index) => (
                                     <tr key={acc.check_id}>
                                     <th scope="row">{acc.user_id}</th>
                                     <td>{acc.business_name}</td>
                                     <td>{acc.firstname}</td>
                                     <td>{acc.user_email}</td>
                                     </tr>                            
                                ))}
                               
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </> 
        :
         <NotAdmin/>}
        </>
        </>
    )
}