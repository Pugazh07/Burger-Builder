import React from 'react';
import { withRouter } from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    console.log("[CheckoutSummary.js] ", props)
    return <div className={classes.CheckoutSummary}>
        <h1>Welcome</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={()=>{props.history.goBack()}}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={()=>{props.history.replace(props.match.url + "/contact-data")}}>
                Continue
            </Button>
    </div>
}

export default withRouter(checkoutSummary);