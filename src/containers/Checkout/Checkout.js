import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = (props) =>{
    const [ingredients, setIngredientsState] = useState({});
    let [totalPrice, setTotalPrice] = useState(0);
    useEffect(()=>{
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
    }, [])
    console.log("[Checkout.js] ", ingredients)
    return <div>
        <CheckoutSummary ingredients={ingredients}/>
        {/* <Route path={props.match.url + '/contact-data'} exact component={ContactData} /> */}
        <Route path={props.match.url + '/contact-data'} exact render={(props)=>(
            <ContactData 
            ingredients={ingredients} 
            totalPrice={totalPrice}
            {...props} />)} />
    </div>
}

export default checkout;