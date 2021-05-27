import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad' , type : 'salad'},
    {label : 'Bacon' , type : 'bacon'},
    {label : 'Cheese' , type : 'cheese'},
    {label : 'Meat' , type : 'meat'}
];

const buildControls = (props) => {
    // console.log(props.addIngredient);
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
            ingredientPrice={props.INGREDIENT_PRICES[ingredient.type]}/>
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