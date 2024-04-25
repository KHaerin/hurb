import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoBagAdd } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const sideBarData = [
    {
        title: 'Dashboard',
        path: '#dashboard',
        icon: <MdIcons.MdSpaceDashboard/>,
        cName: 'nav-text'
    },
    {
        title: 'My Products',
        path: '#myProducts',
        icon: <IoCartSharp />,
        cName: 'nav-text'
    },
    {
        title: 'Add Product',
        path: '#addProduct',
        icon: <IoBagAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '#settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },
    {
        title: 'Home',
        path: '#home',
        icon: <RiIcons.RiLogoutBoxLine/>,
        cName: 'nav-text'
    }
]
