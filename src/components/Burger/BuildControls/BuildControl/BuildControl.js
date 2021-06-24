import React,{ Component } from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';

class BuildControl extends Component {
    // constructor(props){
    //     super(props);
    //     switch (props.type) {
    //         case ('salad'):
    //             price = 20;
    //             break;
    //         case 'bacon':
    //             price = 20;
    //             break;
    //         case 'cheese':
    //             price = 10;
    //             break;
    //         case 'meat':
    //             price = 50;
    //             break;
    //         default:
    //             price= '--';
    //             break;
    //     }
    // }
    
    render(){
        return (
            <div className={classes.BuildControl}>
                <div className={classes.Label}>{this.props.label}</div>
                <button
                    className={classes.Less}
                    onClick={() => this.props.removeIngredient(this.props.type)}
                    disabled={this.props.disableIngredient}>Less</button>
                <button 
                    className={classes.More}
                    onClick={() => this.props.addIngredient(this.props.type)}>More</button>
                <div className={classes.EachPrice}>
                    {this.props.ingredientPrice} Rs
                </div>
            </div>
        )
    }
}

BuildControl.propTypes = {
    ingredientPrice: PropTypes.number.isRequired
}

export default BuildControl;