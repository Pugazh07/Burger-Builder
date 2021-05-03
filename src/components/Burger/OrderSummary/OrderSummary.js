import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    let ingredientSummary = [];
    for (let ingredient in props.ingredients){
        ingredientSummary.push(
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>);
    return <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.cancelled} btnType='Danger'>CANCEL</Button>
        <Button clicked={props.ordered} btnType='Success'>CONTINUE</Button>
    </Aux>
    }
}
export default orderSummary;