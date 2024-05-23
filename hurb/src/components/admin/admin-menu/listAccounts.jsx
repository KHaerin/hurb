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
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
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