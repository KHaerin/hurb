import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'


export default function listSellers(){

    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });


    return(
        <>
            <>  
        {isAdmin === '1' ? 
            <>
                <h1>Seller</h1>
            </> 
        :
         <NotAdmin/>}
        </>
        </>
    )
}