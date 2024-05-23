import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'


export default function settings(){

    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });


    return(
        <>
            <>  
        {isAdmin === '1'? 
            <>
                <h1>Settings</h1>
            </> 
        :
         <NotAdmin/>}
        </>
        </>
    )
}