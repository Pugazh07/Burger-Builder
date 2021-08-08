import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component{
    /* constructor(props){
        super(props);
        this.state={...};
    } */
    state={
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients(){
        /* axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            }); */
        
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const totalAmount = Object.values(ingredients).reduce( (sum, el) => {return sum + el}, 0);
        /* const totalAmount = Object.keys(ingredients)
            .map( type => ingredients[type])
            .reduce((sum, el) => sum+el, 0); */
        // console.log('total sum ',totalAmount)
        // totalAmount >= 0.1  ? this.setState({purchaseable: true}) : this.setState({purchaseable: false});
        return totalAmount > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('Ordered!');
        /* this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Pugazh',
                address: {
                    street: 'dummy street',
                    postalCode: '614624',
                    country: 'India'
                },
                email: 'dummy@email.com'
            },
            deliveryMethod: 'speed',
        }
        axios.post('/orders.json',order)
            .then(response =>{
                this.setState({loading: false, purchasing: false})
                console.log(response.data);
            })
            .catch(error =>{
                this.setState({loading: false, purchasing: false})
                // console.log(error);
            })
        // this.setState({purchasing: false}) */
        // console.log("[BurgerBuilder.js] ",JSON.stringify(this.props.ingredients))
        /* const queryParams = [];
        for ( let i in this.props.ingredients ){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i])) 
        }
        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join('&');
        console.log("[BurgerBuilder.js] ", queryString);
        this.props.history.push({
            pathname: '/checkout',
            // search: '?ing=' + JSON.stringify(this.props.ingredients)
            search: '?' + queryString
        }); */

        this.props.history.push('/checkout');
    }

    /* addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.props.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.props.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        // console.log('state ', this.state);
        // console.log('Triggering updatePurchaseHandler')
        this.updatePurchaseHandler(updatedIngredients);
    } */

    /* removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.props.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.props.totalPrice;
        const priceReduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceReduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseHandler(updatedIngredients);
    } */

    /* resetBurgerHandler = () =>{
        this.setState(
            {
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                totalPrice: 40,
                purchaseable: false,
                purchasing: false
            }
        )
    } */

    render(){
        const disabledInfo = {...this.props.ingredients};
        for ( let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        console.log('[BurgerBuilder.js] props ',this.props);
        let orderSummary = null;
        let burger= this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.props.ingredients){
            orderSummary = <OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            cancelled={this.purchaseCancelHandler}
            ordered={this.purchaseContinueHandler}/>;

            burger=<Aux>
                <Burger ingredients = {this.props.ingredients}/>
                <BuildControls
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    disableIngredient={disabledInfo}
                    price={this.props.totalPrice}
                    enableOrder={this.updatePurchaseState(this.props.ingredients)}
                    enableSummary={this.purchaseHandler}
                    resetBurger={this.props.onResetBurgerState}
                />
            </Aux>;

            if(this.state.loading){
                orderSummary= <Spinner />
            }
        }
        return (<Aux>
            {/* {this.state.purchasing ? <Modal enableOrder={this.state.purchaseable}>
                {<OrderSummary ingredients={this.props.ingredients} />}
                </Modal> : null} */}
            {/* <Backdrop 
                show={this.state.purchasing}
                clicked={this.purchaseCancelHandler}/> */}
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            {/* purchase={this.updatePurchaseHandler} */}
            {/* <div>Build Controls</div> */}
        </Aux>)
    }
}

const mapStateToProps = state =>{
    return (
        {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error
        }
    )
}

const mapDispatchToProps = dispatch =>{
    return(
        {
            onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
            onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
            onResetBurgerState: () => dispatch(burgerBuilderActions.resetBurgerState()),
            onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));