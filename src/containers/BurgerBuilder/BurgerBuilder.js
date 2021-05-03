import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const INGREDIENT_PRICE={
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component{
    /* constructor(props){
        super(props);
        this.state={...};
    } */
    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseHandler = (ingredients) => {
        // const ingredients = {...this.state.ingredients};
        // console.log(Object.values(ingredients))
        const totalAmount = Object.values(ingredients).reduce( (sum, el) => {return sum + el}, 0);
        /* const totalAmount = Object.keys(ingredients)
            .map( type => ingredients[type])
            .reduce((sum, el) => sum+el, 0); */
        // console.log('total sum ',totalAmount)
        // totalAmount >= 0.1  ? this.setState({purchaseable: true}) : this.setState({purchaseable: false});
        this.setState({purchaseable: totalAmount > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('Ordered!');
        this.setState({purchasing: false})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICE[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        // console.log('state ', this.state);
        // console.log('Triggering updatePurchaseHandler')
        this.updatePurchaseHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceReduction = INGREDIENT_PRICE[type];
        const newPrice = oldPrice - priceReduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseHandler(updatedIngredients);
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for ( let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        // console.log('Purchaseable ',this.state.purchaseable)
        return (<Aux>
            {/* {this.state.purchasing ? <Modal enableOrder={this.state.purchaseable}>
                {<OrderSummary ingredients={this.state.ingredients} />}
                </Modal> : null} */}
            <Backdrop 
                show={this.state.purchasing}
                clicked={this.purchaseCancelHandler}/>
            <Modal show={this.state.purchasing}>
                {<OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancelled={this.purchaseCancelHandler}
                    ordered={this.purchaseContinueHandler}/>}
            </Modal>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disableIngredient={disabledInfo}
            price={this.state.totalPrice}
            enableOrder={this.state.purchaseable}
            enableSummary={this.purchaseHandler}/>
            {/* purchase={this.updatePurchaseHandler} */}
            {/* <div>Build Controls</div> */}
        </Aux>)
    }
}

export default BurgerBuilder;