import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'

import styles from './Auth.css';


const Auth = () => {
    const {token, userId ,loading, error} = useSelector(state => state.auth);
    console.log("Auth.js", token, userId, error)
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                isValid: false,
                touched: false
            }
        },
        isSignIn: true
    })

    const [isSignIn, setAuthMode]=useState(true)
    const submitHandler = (event, email=formState.controls.email.value, password=formState.controls.password.value) => {
        console.log(event)
        event.preventDefault();
        dispatch(actions.auth(email, password, isSignIn))
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
        const newControls = JSON.parse(JSON.stringify(formState.controls));
        newControls[id].value=event.target.value;
        if(newControls[id].validation){
            newControls[id].isValid=checkValidity(newControls[id].value, newControls[id].validation);
        }
        newControls[id].touched=true;
        setFormState({controls: newControls});
    }

    let switchAuthMode = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setAuthMode(!isSignIn);
    }

    let formArrayElements = [];
    for (let key in formState.controls){
        formArrayElements.push({
            id: key,
            config: formState.controls[key]}
        )
    }

    let formHeader="Sign in"
    let formFooter={
        p: "Don't have an account ? ",
        button: "Sign up"
    }
    if(!isSignIn){
        formHeader="Sign up";
        formFooter.p="Already have an account ? ";
        formFooter.button="Sign in";
    }

    let form = (
        <form onSubmit={submitHandler}>
            <h1>{formHeader}</h1>
            {error ? <p style={{color: 'red', fontWeight: 'bold'}}>{error.message} !</p> : null}
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
            <Button btnType="Success">Submit</Button>
            <p>{formFooter.p}<Button btnType="Danger" clicked={switchAuthMode}>{formFooter.button}</Button></p>
        </form>
    )
    if(loading) form = <Spinner/>
    return <div className={styles.Auth}>
        {form}
    </div>
}

export default Auth;