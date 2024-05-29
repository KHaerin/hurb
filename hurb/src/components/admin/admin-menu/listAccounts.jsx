import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'

export default function listAccounts(){

    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost/hurb/Admin/getAccount.php`);
                const addressData = response.data;
                setAccounts(addressData);
            } catch (error) {
                console.error('Error fetching accounts details:', error);
            }
        };

        fetchAccount();
    }, [])

    useEffect(() => {
        console.log(accounts);
    })

    return(
        <>  
        {isAdmin === '1' ? 
            <>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col">
                            <h1>List of Accounts</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">User ID</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((acc, index) => (
                                     <tr key={acc.users_id}>
                                     <th scope="row">{acc.users_id}</th>
                                     <td>{acc.firstname}</td>
                                     <td>{acc.userName}</td>
                                     <td>{acc.email}</td>
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
    )
}