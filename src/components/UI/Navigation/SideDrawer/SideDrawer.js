import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../../hoc/Auxiliary';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {
    let sideDrawerClass=[classes.SideDrawer, classes.Close];
    if(props.show){
        sideDrawerClass=[classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={sideDrawerClass.join(' ')} >
                <Logo height='11%'/>
                <nav>
                    <NavigationItems direction='column'/>
                </nav>
            </div>
        </Aux>
    );        
}

export default sideDrawer;