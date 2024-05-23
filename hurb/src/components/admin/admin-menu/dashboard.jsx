import React, { useState, useEffect } from 'react';
import NotAdmin from '../../NotAdmin'
export default function dashboard(){

    const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    setIsAdmin(localStorage.getItem('userId'));
  });

    return(
        <>

        {isAdmin === '1' ?             
            <h1>Dashboard</h1>
        : 
            <NotAdmin/>
        }
        </>
    )
}