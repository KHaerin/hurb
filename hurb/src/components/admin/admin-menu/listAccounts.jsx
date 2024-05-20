import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'

export default function listAccounts(){

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });

    return(
        <>  
        {isAdmin === 1 ? 
            <>
                <h1>List of Accounts</h1>
            </> 
        :
         <NotAdmin/>}
        </>
    )
}