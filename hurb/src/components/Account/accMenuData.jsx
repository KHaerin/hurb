import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoCartSharp } from "react-icons/io5";
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const accMenuData = [
    {
        title: 'Profile',
        path: '#profile',
        icon: <RiIcons.RiAccountPinCircleFill/>,
        cName: 'acc-menu-text'
    },
    {
        title: 'Address Book',
        path: '#account/addressBook',
        icon: <FaIcons.FaAddressBook/>,
        cName: 'acc-menu-text'
    },
    {
        title: 'Order History',
        path: '#account/myOrder',
        icon: <RiIcons.RiShoppingBasket2Fill />,
        cName: 'acc-menu-text'
    },
    {
        title: 'My Vouchers',
        path: '#myVouchers',
        icon: <RiIcons.RiCoupon3Fill/>,
        cName: 'acc-menu-text'
    },
]
