import React, { useState } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';

const contactData = (props) =>{
    const [contactInfo , setcContactInfo] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: ''
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'normal', displayValue: 'Ordinary'}]
            },
            value: ''
        },
    })

    let [loading, setLoadingState] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        console.log("[ContactData.js] ",props)
        setLoadingState(true);
        const formData={};
        for (let key in contactInfo){
            formData[key]=contactInfo[key].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
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
        axios.post('/orders.json',order)
            .then(response =>{
                setLoadingState(false)
                console.log(response.data);
                props.history.push("/")
            })
            .catch(error =>{
                setLoadingState(false)
                // console.log(error);
            })
    }

    let inputChangedHandler = (event, id) =>{
        // console.log("[ContactData.js event ", event);
        const newContactInfo = JSON.parse(JSON.stringify(contactInfo));
        newContactInfo[id].value=event.target.value;
        setcContactInfo(newContactInfo);
    }

    let formArrayElements = [];
    for (let key in contactInfo){
        formArrayElements.push({
            id: key,
            config: contactInfo[key]}
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
                    changed={(event) =>{inputChangedHandler(event, element.id)}}/>
                ))}
                <Button btnType="Success">Order</Button>
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

export default contactData;