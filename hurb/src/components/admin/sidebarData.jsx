import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
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
        title: 'Applications',
        path: '#applications',
        icon: <FaIcons.FaFileInvoice/>,
        cName: 'nav-text'
    },
    {
        title: 'List of Accounts',
        path: '#listAccounts',
        icon: <MdIcons.MdManageAccounts/>,
        cName: 'nav-text'
    },
    {
        title: 'List of Sellers',
        path: '#listSellers',
        icon: <RiIcons.RiFileList3Fill/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '#adminSettings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },
    {
        title: 'Back',
        path: '#logout',
        icon: <RiIcons.RiLogoutBoxFill/>,
        cName: 'nav-text'
    },
]
