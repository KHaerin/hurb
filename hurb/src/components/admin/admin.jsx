import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { sideBarData } from './sidebarData';
import './admin.css';
import { Container, Row, Col, Button} from 'react-bootstrap';
import Dashboard from './admin-menu/dashboard';
import Application from './admin-menu/applications';
import ListAccounts from './admin-menu/listAccounts';
import ListSellers from './admin-menu/listSellers';
import AdminSettings from './admin-menu/settings';


const Admin = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem('activeLink') || '#dashboard';
  });

  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);

    if(link === '#logout'){
        logout();
    }
  };

  const logout = () => {
        setActiveLink('#dashboard');
        window.location.href="/"
  }

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('userId'));
  });


    const[sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const goBack = () => {
        window.location.href="/"
    }


  return (
    <> 
    {isAdmin ? 
        <>
             <Container fluid className="navbar-admin p-4">
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars id="burger" onClick={showSidebar}/>
            </Link>
    </Container>
    <Container>
        <Row>
            <Col>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle" id="toggle" onClick={showSidebar}>
                        <Link to="#" id="burger" className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {sideBarData.map((links, index) => {
                        return(
                            <li key={index} className={links.cName}>
                                <Link to={links.path} onClick={() => handleLinkClick(links.path)}>
                                    {links.icon}
                                    <span id="link-title">{links.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav> 
            </Col>
        </Row>
        <Row>
            <Col>
                    {activeLink === '#dashboard' && 
                        <Dashboard/>
                    }
                    {activeLink === '#applications' && 
                        <Application/>
                    }
                    {activeLink === '#listAccounts' && 
                        <ListAccounts/>
                    }
                    {activeLink === '#listSellers' && 
                        <ListSellers/>
                    }
                    {activeLink === '#adminSettings' && 
                        <AdminSettings/>
                    }
            </Col>
        </Row>
    </Container>
        </>
     : 
        <>
            <Container fluid>
                <Row >
                    <Col lg={12} className='d-flex justify-content-center align-items-center'>
                        <h1>di ka admin ulol</h1>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Button variant='dark' onClick={goBack}>Go back pls</Button>
                    </Col>
                </Row>
            </Container>
        </>
     }
   
    </>
  );
};

export default Admin;
