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
        title: 'Home',
        path: '#home',
        icon: <IoIcons.IoIosHome/>,
        cName: 'nav-text'
    },
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
        title: 'Orders',
        path: '#orders',
        icon: <FaIcons.FaClipboardList/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '#settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },
]
