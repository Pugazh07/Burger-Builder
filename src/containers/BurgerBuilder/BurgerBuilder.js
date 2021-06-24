import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad: 20,
    bacon: 20,
    cheese: 10,
    meat: 50
}

class BurgerBuilder extends Component{
    /* constructor(props){
        super(props);
        this.state={...};
    } */
    state={
        ingredients: null,
        totalPrice: 40,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients(){
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        // alert('Ordered!');
        /* this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        // console.log("[BurgerBuilder.js] ",JSON.stringify(this.state.ingredients))
        const queryParams = [];
        for ( let i in this.state.ingredients ){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])) 
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        console.log("[BurgerBuilder.js] ", queryString);
        this.props.history.push({
            pathname: '/checkout',
            // search: '?ing=' + JSON.stringify(this.state.ingredients)
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
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
        const priceReduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceReduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseHandler(updatedIngredients);
    }

    resetBurgerHandler = () =>{
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
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for ( let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        // console.log('Purchaseable ',this.state.purchaseable)
        let orderSummary = null;
        let burger= this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.state.ingredients){
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancelled={this.purchaseCancelHandler}
            ordered={this.purchaseContinueHandler}/>;

            burger=<Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disableIngredient={disabledInfo}
                price={this.state.totalPrice}
                enableOrder={this.state.purchaseable}
                enableSummary={this.purchaseHandler}
                resetBurger={this.resetBurgerHandler}
                INGREDIENT_PRICES={INGREDIENT_PRICES}/>
            </Aux>;

            if(this.state.loading){
                orderSummary= <Spinner />
            }
        }
        return (<Aux>
            {/* {this.state.purchasing ? <Modal enableOrder={this.state.purchaseable}>
                {<OrderSummary ingredients={this.state.ingredients} />}
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

export default withErrorHandler(BurgerBuilder, axios);