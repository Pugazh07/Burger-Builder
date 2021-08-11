import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 40,
    error: false
}

export const INGREDIENT_PRICES={
    salad: 20,
    bacon: 20,
    cheese: 10,
    meat: 50
}

const burgerBuilderReducer = ( state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.RESET_BURGER_STATE:
            let ingredients={}
            Object.keys(state.ingredients).forEach(key=>{
                ingredients[key]=0
            })
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: initialState.totalPrice,
                error: false
            }
        case actionTypes.SET_INGREDIENTS:
            console.log(action.ingredients)
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: initialState.totalPrice,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default burgerBuilderReducer;