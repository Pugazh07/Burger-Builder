import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

import { INGREDIENT_PRICES } from '../../../store/actions/actionTypes'

const controls = [
    {label : 'Salad' , type : 'salad'},
    {label : 'Bacon' , type : 'bacon'},
    {label : 'Cheese' , type : 'cheese'},
    {label : 'Meat' , type : 'meat'}
];

const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)} Rs</strong></p>
        {controls.map( ingredient => {
            return <BuildControl
            key={ingredient.label}
            label={ingredient.label}
            type={ingredient.type}
            addIngredient={props.addIngredient}
            removeIngredient={props.removeIngredient}
            disableIngredient={props.disableIngredient[ingredient.type]}
            ingredientPrice={INGREDIENT_PRICES[ingredient.type]}
            />
            }
            )}
        <div>
            <button className={classes.ResetBurger} onClick={props.resetBurger} disabled={!props.enableOrder}>
                Reset
            </button>
            <button
                className={classes.OrderButton}
                disabled={!props.enableOrder}
                onClick={props.enableSummary}>
                    ORDER NOW
                </button>
        </div>
    </div>;
}

export default buildControls;