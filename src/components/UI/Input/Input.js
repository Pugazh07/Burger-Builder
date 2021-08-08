import React from 'react';

import classes from './Input.module.css';

const input = (props) =>{
    let inputElement = null;
    let inputClasses=[classes.Input];
    if(props.shouldValidate && props.touched && props.inValid){
        inputClasses.push(classes.InValid)
    }
    switch (props.elementType) {
        case 'input':
            inputElement= <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case 'textArea':
            inputElement=<textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case 'select':
            inputElement=(
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    valid={props.valid}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                </select>
            )
            break;
        default:
            inputElement= <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
    }
    return (
        <div >
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;