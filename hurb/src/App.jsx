import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import RegSeller from './components/Account/Seller_Account/regSeller/regSeller';
import About from "./components/About/About";
import Contact from './components/Contact/Contact';
import Shop from './components/Shop/Shop';
import Top from './components/Shop/products/Top';
import Bottom from './components/Shop/products/Bottom';
import Account from './components/Account/Account';
import Footer from './components/Footer/Footer';
import Seller from './components/Account/Seller_Account/Seller';
import Products from './components/Account/Seller_Account/Seller_Menu/Products';
import AddProduct from './components/Account/Seller_Account/Seller_Menu/addproduct/addproduct';
import AddCart from './components/addCart/addCart';
import ProductLook from './components/Shop/product-page/productLook';
import Login from './components/Login/Login';
import Register from './components/Login/Register/Register';
import Cart from './components/Shop/cart/cart';
import Header from './components/header/HeaderMenu';
import Admin from './components/admin/admin';
import Application from './components/admin/admin-menu/applications';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/checkout';
import Profile from './components/Account/AccountMenu/Profile';
import AddressBook from './components/Account/AccountMenu/AddressBook';
import AddAddress from './components/Account/AccountMenu/AddAddress';
import Dashboard from './components/admin/admin-menu/dashboard';
import ListAccounts from './components/admin/admin-menu/listAccounts';
import ListSellers from './components/admin/admin-menu/listSellers';
import SettingsAdmin from './components/admin/admin-menu/settings';
import {CartProvider} from './components/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import NotAdmin from './components/NotAdmin';
import "./App.css";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const checkSeller = async() => {
        const admin_id = localStorage.getItem('userId');

        try {
            const response = await axios.get(`http://localhost/hurb/Seller/isSeller.php?user_id=${admin_id}`);
            const responsedata = response.data;
            // console.log(responsedata);
            if(responsedata.user_id === null){
                setIsSeller(false);
            }else{
                setIsSeller(true);
                
                if(isSellerRoute()){
                    localStorage.setItem('sellerId', responsedata.seller_id);
                    // console.log(responsedata.seller_id)
                }
            }
        
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const admin_id = localStorage.getItem('userId');

        checkSeller();
        
        if(admin_id === '1'){
            setAdmin(true);
        }else{
            setAdmin('false');
        }
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    let loc = useLocation();
    useEffect(() => {
        if(loc.pathname !== '/account'){
            localStorage.removeItem('activeLink');
        }

        if(loc.pathname !== '/seller'){
            localStorage.removeItem('activeLinkSeller')
            localStorage.removeItem('sellerId');
        }
    })

    const handleLoginStatus = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem('isLoggedIn', status);
    }

    const isAdminRoute = () => {
        return loc.pathname.includes("/login/admin");
    }

    const isSellerRoute = () => {
        return loc.pathname.includes("/seller");
    }

    const renderHeader = () => {
        if (isAdminRoute() || isSellerRoute()) {
            return null; 
        }
        return (
            <>
                <Header />
            </>
        );
    };
    
    const renderFooter = () => {
        if (isAdminRoute() || isSellerRoute()) {
            return null; 
        }
        return (
            <>
                <Footer />
            </>
        );
    }

  return (
    <>
    <CartProvider>
                {renderHeader()}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/top" element={<Top />} />
                    <Route path="/bottom" element={<Bottom />} />
                    <Route path="/account" element={<Account />} />
                    
                    {isSeller ? 
                    <>
                        <Route path="/seller" element={<Seller />} />
                        <Route path="/seller/products" element={<Products />} />
                        <Route path="/seller/products/addproducts" element={<AddProduct />} />
                    </>
                    :
                    <>
                        <Route path="/seller" element={<NotAdmin />} />
                        <Route path="/seller/products" element={<NotAdmin />} />
                        <Route path="/seller/products/addproducts" element={<NotAdmin />} />
                    </>
                    }
                   
                    <Route path="/shop/productLook/:productId" element={<ProductLook />} />
                    <Route path="/login" element={<Login updateLoginStatus={handleLoginStatus} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shop/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {isLoggedIn && <Route path="/regSeller" element={<RegSeller />} />}
                    {/* <Route path="/regSeller" element={<RegSeller />} /> */}
                    <Route path="/login/admin" element={<Admin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/listAccounts" element={<ListAccounts />} />
                    <Route path="/admin/listSellers" element={<ListSellers />} />
                    <Route path="/admin/Settings" element={<SettingsAdmin />} />
                    <Route path="/admin/application" element={<Application />} />
                </Routes>
                {renderFooter()}
                <ToastContainer
                position="top-right"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
    </CartProvider>
      
    </>
  )
}

export default App;
