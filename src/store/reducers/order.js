import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: state.orders.concat({
                    ...action.orderData,
                    id: action.orderId
                })
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false,
            }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log(action.orders)
            return{
                ...state,
                orders: action.orders,
                loading: false,
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            console.log(state.orders)
            return{
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default orderReducer;