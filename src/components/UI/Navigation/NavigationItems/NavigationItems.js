import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} style={{flexDirection: props.direction}}>
        <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Login</NavigationItem>
    </ul>
)

export default navigationItems;