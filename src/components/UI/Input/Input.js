import { element } from 'prop-types';
import React from 'react';

import classes from './Input.module.css';

const input = (props) =>{
    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement= <input className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case 'textArea':
            inputElement=<textarea className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        case 'select':
            inputElement=(
                <select
                    className={classes.Input}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                </select>
            )
            break;
        default:
            inputElement= <input className={classes.Input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
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