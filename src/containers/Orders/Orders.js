import React, { useEffect} from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';

const orders = () =>{
    // const [orders, setOrdersState] = useState([]);
    // let [loading, setLoadingState] = useState(true);
    const {orders, loading} = useSelector(state => ({
        orders: state.order.orders,
        loading: state.order.loading
    }))
    console.log(orders)
    const dispatch = useDispatch()
    const onFetchOrders = () => dispatch(actions.fetchOrders())
    useEffect(
        ()=>{
        /* axios.get("/orders.json")
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
        }) */
        onFetchOrders()
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