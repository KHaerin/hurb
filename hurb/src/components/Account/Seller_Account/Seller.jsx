import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { sideBarData } from './Seller-Dashboard/sideBar';
import { Container, Row, Col} from 'react-bootstrap';
import MyProducts from './Seller_Menu/Products';
import AddProduct from './Seller_Menu/addproduct/addproduct';
import Orders from './Seller_Menu/ListOrders';
export default function Seller(){

 const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem('activeLinkSeller') || '#dashboard';
  });

  useEffect(() => {
    localStorage.setItem('activeLinkSeller', activeLink);
  }, [activeLink]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    showSidebar();

    if(link === '#logout'){
        logout();
    }
  };

  const logout = () => {
        setActiveLink('#dashboard');
        window.location.href="/"
  }

    const[sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const goHome = () => {
        setActiveLink('#dashboard');
        localStorage.removeItem('onSeller');
        window.location.href="/";
    }

    const text_style = {
        color: '#ffffff'
    }

    const dashStyle = {
        position: 'relative',
        zIndex: 2
    }

    return(
        <>
        <Container fluid className="navbar-admin p-4" style={dashStyle}>
            <Row>
                <Col className='menu-bars col-auto'>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars id="burger" onClick={showSidebar}/>
                    </Link>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    {activeLink === '#dashboard' && 
                       <h1 style={text_style}>Dashboard</h1>
                    }
                    {activeLink === '#myProducts' && 
                        <h1 style={text_style}>My Products</h1>
                    }
                    {activeLink === '#addProduct' && 
                       <h1 style={text_style}>Add Product</h1>
                    }
                    {activeLink === '#settings' && 
                        <h1 style={text_style}>Settings</h1>
                    }
                    {activeLink === '#orders' && 
                        <h1 style={text_style}>Orders</h1>
                    }
                </Col>
            </Row>
           
    </Container>
    <Container style={dashStyle}>
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
                       <h1>Under Construction...</h1>
                    }
                    {activeLink === '#myProducts' && 
                       <MyProducts/>
                    }
                    {activeLink === '#addProduct' && 
                        <AddProduct/>
                    }
                    {activeLink === '#orders' && 
                        <Orders/>
                    }
                    {activeLink === '#settings' && 
                        <h1>Under Construction...</h1>
                    }
                    {activeLink === '#home' && goHome()}
            </Col>
        </Row>
    </Container>
    </>
    )
}