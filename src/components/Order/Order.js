import React from 'react';

import classes from './Order.module.css'

const order =(props) =>{
    const ingredientSummary = [];
    console.log("[Order.js props]", props);
    for (let ingredientName in props.ingredients){
        ingredientSummary.push(
                <span
                key={ingredientName}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '10px',
                    border:'1px solid #ccc',
                    borderRadius: '3px'}}>{ingredientName}: {props.ingredients[ingredientName]}
                </span>
            );
    }

    return (<div className={classes.Order}>
        <p>Name: {props.orderData.name}</p>
        <p>Order id: {props.orderId}</p>
        <p>Ingredients : {ingredientSummary}</p>
        <p>Price : <strong>&#8377;{props.price}</strong></p>
    </div>)
}

export default order;