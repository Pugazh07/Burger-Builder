import React from 'react';
import Aux from './../../hoc/Auxiliary';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'

const layout = (props) => (
    <Aux>
        {/* <div>Toolbay, Sidebar, Backdrop</div> */}
        <Toolbar />
        <main className={classes.Content}>{props.children}</main>
        <BurgerBuilder />
    </Aux>
);

export default layout;