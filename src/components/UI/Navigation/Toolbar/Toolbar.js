import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        {/* <Hamburger clicked={props.show}/> */}
        <DrawerToggle clicked={props.show}/>
        <Logo height='80%' />
        <nav  className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;