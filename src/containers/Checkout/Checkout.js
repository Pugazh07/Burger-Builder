import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = (props) =>{
    // const [ingredients, setIngredientsState] = useState({});
    // let [totalPrice, setTotalPrice] = useState(0);
    /* useEffect(()=>{
        const query = new URLSearchParams(props.location.search);
        console.log("[Checkout.js] ",query.entries());
        const ingre = {};
        let price;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = +param[1];
            }
            else{
                ingre[param[0]]= +param[1]
            }
        }
        console.log("[Checkout.js] ",ingre);
        setIngredientsState(ingre)
        setTotalPrice(price)
        return () => {console.log("[Checkout.js] Cleanup") }
    }, []) */
    console.log("[Checkout.js] ", props.ingredients)
    return props.ingredients ? (<div>
        <CheckoutSummary ingredients={props.ingredients}/>
        <Route path={props.match.url + '/contact-data'} exact component={ContactData} />

        {/* Below code is for before redux */}
        {/* <Route path={props.match.url + '/contact-data'} exact render={(props)=>(
            <ContactData 
            ingredients={props.ingredients}
            totalPrice={props.totalPrice}
            {...props} />)} /> */}
    </div>) : <Redirect to="/" />
}

const mapStateToProps = state =>{
    return (
        {
            ingredients: state.burgerBuilder.ingredients,
        }
    )
}

export default connect(mapStateToProps)(checkout);