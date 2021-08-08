import React, { useState, useEffect} from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const orders = () =>{
    const [orders, setOrdersState] = useState([]);
    let [loading, setLoadingState] = useState(true);
    useEffect(
        ()=>{
        axios.get("/orders.json")
        .then(response =>{
            console.log("[Orders.js] ",response);
            const fetcehdOrders=[];
            for (let key in response.data){
                fetcehdOrders.push({...response.data[key], id: key})
            }
            console.log("[Orders.js] fetcehdOrders ",fetcehdOrders)
            setOrdersState(fetcehdOrders);
            setLoadingState(false)
        })
        .catch(error =>{
            console.log("[Orders.js] ",error)
            setLoadingState(false)
        })
    }, [])

    // let order = (<Order />);
    let order = orders.map(order =>{
        return(
            <Order key={order.id} orderId={order.id} orderData={order.orderData} ingredients={order.ingredients} price={order.price}/>
        )
    })
    if(loading){
        order = (<Spinner />);
    }   
    console.log("[Orders.js] ",loading);
    return (
    <div>
        {order}
    </div>)
}

export default withErrorHandler(orders, axios);