import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft, faHome, faUser, faCog, faFileInvoice, faList } from '@fortawesome/free-solid-svg-icons';
import LogoutIcon from '../icons/logout.png';
import './admin.css';
import "bootstrap/dist/js/bootstrap";

import Dashboard from './admin-menu/dashboard';
import Applications from './admin-menu/applications';
import ListAccount from './admin-menu/listAccounts';
import ListSellers from './admin-menu/listSellers';
import Settings from './admin-menu/settings';


const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => {
    // Retrieve the active link from local storage
    return localStorage.getItem('activeLink') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = () => {
        window.location.href="/"
  }

  return (
    <>
    <div className="container-fluid">
        <div className="row row-cols-2">
            <div className="col-auto" id="menu-dashboard">
                <div className={`dashboard-menu ${isOpen ? 'open' : 'closed'}`}>
                    <div className="logo-container d-flex">
                        {isOpen ? (
                            <>
                                <img src="" alt="logo" />
                                <span id="hurb-title">hurb.</span>
                            </>
                        ) : (
                                <img src="" alt="logo" />
                        )}
                    </div>
                    <hr className="border border-light border-1 opacity-100" id="hr-dashboard"/>
                    <div className="toggle-button d-flex justify-content-end align-items-end mb-4" onClick={toggleMenu}>
                        {isOpen ? (
                            <FontAwesomeIcon icon={faAngleDoubleLeft} className="dashboard-icons" id="openDashboard-btn"/>
                        ) : (
                            <FontAwesomeIcon icon={faAngleDoubleRight} className="dashboard-icons" id="openDashboard-btn"/>
                        )}
                    </div>
                    <div className="col">
                        <div className="container-fluid">
                        <div className="navbar d-flex justify-content-center align-items-center">
                            <div className="navbar-nav">
                                <ul className="navbar-nav">
                                    <li className='nav-item d-flex justify-content-center align-items-center'>
                                        {isOpen ? (
                                            <>
                                            
                                            <a href="#dashboard" className={`nav-link gap-3   d-flex ${activeLink === 'dashboard' ? 'active' : ''}`} id="sellerLinks" onClick={() => handleLinkClick('dashboard')}>
                                                <FontAwesomeIcon icon={faHome} className="dashboard-icons" id="openDashboard-btn"/>
                                                <span>Dashboard</span>
                                                </a>

                                            </>
                                        ) : (
                                            <a href="#dashboard" className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`} id="sellerLinks-closed" onClick={() => handleLinkClick('dashboard')}>
                                                <FontAwesomeIcon icon={faHome} className="dashboard-icons" id="openDashboard-btn"/>
                                                </a>
                                        )}
                                        
                                    </li>
                                    <li className='nav-item d-flex justify-content-center  align-items-center'>
                                        {isOpen ? (
                                             <a href="#app" className={`nav-link d-flex gap-3  ${activeLink === 'application' ? 'active' : ''}`} id="sellerLinks" onClick={() => handleLinkClick('application')}>
                                                <FontAwesomeIcon icon={faFileInvoice} className="dashboard-icons" id="openDashboard-btn"/>
                                                Application
                                             </a>
                                        ) : (
                                            <a href="#app" className={`nav-link ${activeLink === 'application' ? 'active' : ''}`} id="sellerLinks-closed" onClick={() => handleLinkClick('application')}>
                                                <FontAwesomeIcon icon={faFileInvoice} className="dashboard-icons" id="openDashboard-btn"/>
                                             </a>
                                        )}
                                       
                                    </li>
                                    <li className='nav-item d-flex justify-content-center align-items-center'>
                                        {isOpen ? (
                                             <a href="#listAccounts" className={`nav-link gap-3  d-flex ${activeLink === 'ListAccounts' ? 'active' : ''}`} id="sellerLinks" onClick={() => handleLinkClick('ListAccounts')}>
                                                <FontAwesomeIcon icon={faUser} className="dashboard-icons" id="openDashboard-btn"/>
                                                Accounts
                                             </a>
                                        ) : (
                                            <a href="#listAccounts" className={`nav-link ${activeLink === 'ListAccounts' ? 'active' : ''}`} id="sellerLinks-closed" onClick={() => handleLinkClick('ListAccounts')}>
                                                <FontAwesomeIcon icon={faUser} className="dashboard-icons" id="openDashboard-btn"/>
                                             </a>
                                        )}
                                       
                                    </li>
                                    <li className='nav-item d-flex justify-content-center align-items-center'>
                                        {isOpen ? (
                                             <a href="#ListSeller" className={`nav-link d-flex gap-3 ${activeLink === 'ListSeller' ? 'active' : ''}`} id="sellerLinks" onClick={() => handleLinkClick('ListSeller')}>
                                                <FontAwesomeIcon icon={faList} className="dashboard-icons" id="openDashboard-btn"/>
                                                Sellers
                                             </a>
                                        ) : (
                                            <a href="#ListSeller" className={`nav-link ${activeLink === 'ListSeller' ? 'active' : ''}`} id="sellerLinks-closed" onClick={() => handleLinkClick('ListSeller')}>
                                                <FontAwesomeIcon icon={faList} className="dashboard-icons" id="openDashboard-btn"/>
                                             </a>
                                        )}
                                       
                                    </li>
                                    <li className='nav-item d-flex justify-content-center align-items-center'>
                                        {isOpen ? (
                                             <a href="#Settings" className={`nav-link gap-3  d-flex ${activeLink === 'Settings' ? 'active' : ''}`} id="sellerLinks" onClick={() => handleLinkClick('Settings')}>
                                                <FontAwesomeIcon icon={faCog} className="dashboard-icons" id="openDashboard-btn"/>
                                                Settings
                                             </a>
                                        ) : (
                                            <a href="#Settings" className={`nav-link ${activeLink === 'Settings' ? 'active' : ''}`} id="sellerLinks-closed" onClick={() => handleLinkClick('Settings')}>
                                                <FontAwesomeIcon icon={faCog} className="dashboard-icons" id="openDashboard-btn"/>
                                             </a>
                                        )}
                                       
                                    </li>
                                    <li className='nav-item d-flex justify-content-center align-items-center'>
                                        {isOpen ? (
                                             <a href="#Settings" className={`nav-link d-flex ${activeLink === 'Logout' ? 'active' : ''}`} id="sellerLinks" onClick={logout}>
                                                <img src={LogoutIcon} className="dashboard-icons" id="openDashboard-btn"/>
                                                <span>Logout</span>
                                             </a>
                                        ) : (
                                            <a href="/shop" className={`nav-link ${activeLink === 'Logout' ? 'active' : ''}`} id="sellerLinks-closed" onClick={logout}>
                                                <img src={LogoutIcon} className="dashboard-icons" id="openDashboard-btn"/>
                                             </a>
                                        )}
                    
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                    {activeLink === 'dashboard' && (
                        <Dashboard/>
                    )}
                    {activeLink === 'application' && (
                    <Applications />
                )}
            </div>
        </div>
    </div>
    </>
  );
};

export default Admin;
