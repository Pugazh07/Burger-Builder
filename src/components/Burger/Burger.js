import React from 'react';
// import Aux from './../../hoc/Auxiliary';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    console.log("[Burger.js] Ingrdients ", props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
    .map( (ingKey) => {
        return [...Array(props.ingredients[ingKey])].map( (_,i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
        });
    })
    .reduce((arr, el) => {return arr.concat(el)}, []);
    console.log("[Burger.js] transformedIngredients ",transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = 'Please start add ingredients!'
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;