import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = ingredientName => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const resetBurgerState = () => {
    return{
        type: actionTypes.RESET_BURGER_STATE
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        console.log("Set Ingredients")
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response)
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchIngredientsFailed(error))
            })
    }
}