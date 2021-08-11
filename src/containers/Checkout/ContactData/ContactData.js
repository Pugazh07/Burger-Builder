import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as purchaseOrderActions from '../../../store/actions/index'

import classes from './ContactData.module.css';

const contactData = (props) =>{
    const [formState , setFormState] = useState({contactInfo: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation:{
                    required: true,
                },
                isValid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true,
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'normal', displayValue: 'Ordinary'}]
                },
                value: 'fastest',
                isValid: true
            },
        },
        formIsValid: false
    })

    // let [loading, setLoadingState] = useState(false);
    const {ingredients, totalPrice, loading} = useSelector( (state) =>{
        return {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            loading: state.order.loading
        }
    })
    const dispatch = useDispatch();
    const onPurchaseOrder = (orderData, url) => dispatch(purchaseOrderActions.purchaseBurger(orderData, url))
    console.log("Contact Data state", ingredients, totalPrice, loading);
    
    const orderHandler = (event) => {
        event.preventDefault();
        // console.log("[ContactData.js] ",props);
        const formData={};
        for (let key in formState.contactInfo){
            formData[key]=formState.contactInfo[key].value;
        }
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: formData,
            /* customer: {
                name: formData["name"],
                address: {
                    street: formData["street"],
                    postalCode: formData["postalCode"],
                    country: formData["country"]
                },
                email: formData["email"]
            },
            deliveryMethod: formData["deliveryMethod"], */
        }
        /* axios.post('/orders.json',order)
            .then(response =>{
                setLoadingState(false)
                console.log(response.data);
                props.history.push("/")
            })
            .catch(error =>{
                setLoadingState(false)
                // console.log(error);
            }) */
        // props.onPurchaseOrder(order, props.history);
        onPurchaseOrder(order, props.history);
    }

    let checkValidity = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid=value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    let inputChangedHandler = (event, id) =>{
        const newContactInfo = JSON.parse(JSON.stringify(formState.contactInfo));
        newContactInfo[id].value=event.target.value;
        if(newContactInfo[id].validation){
            newContactInfo[id].isValid=checkValidity(newContactInfo[id].value, newContactInfo[id].validation);
        }
        newContactInfo[id].touched=true;
        let newFormIsValid=true;
        for(let key in newContactInfo){
            newFormIsValid=newContactInfo[key].isValid && newFormIsValid;
        }
        console.log("FormIsValid", newFormIsValid)
        formState.formIsValid=newFormIsValid;
        setFormState({contactInfo: newContactInfo, formIsValid: newFormIsValid});
    }

    console.log("[ContactData.js] contactInfo",formState.contactInfo);

    let formArrayElements = [];
    for (let key in formState.contactInfo){
        formArrayElements.push({
            id: key,
            config: formState.contactInfo[key]}
            )
    }

    let form = (
        <form onSubmit={orderHandler}>
                {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name" required/>
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" required/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code"/> */}
                {formArrayElements.map(element => (
                    <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    inValid={!element.config.isValid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) =>{inputChangedHandler(event, element.id)}}/>
                ))}
                <Button disabled={!formState.formIsValid} btnType="Success">Order</Button>
            </form>
    )
    if(loading){ form = <Spinner />}
    return(
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}

/* const mapStateToProps = state =>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPurchaseOrder: (orderData, url) => dispatch(purchaseOrderActions.purchaseBurger(orderData, url))
    }
} */

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
export default withErrorHandler(contactData, axios);