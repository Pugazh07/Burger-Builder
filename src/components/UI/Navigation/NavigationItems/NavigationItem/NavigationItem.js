import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) =>{
    /* return(
        <li className={classes.NavigationItem}>
            <a href={props.link} 
            // className={ props.active ? classes.active : null}
            >
                {props.children}
            </a>
        </li>
    ) */

    return(
        <li className={classes.NavigationItem}>
        <NavLink
        to={props.link}
        activeClassName={classes.active}
        exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
    )
}

export default navigationItem;