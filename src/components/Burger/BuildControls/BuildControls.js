import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => {

    const buttons = props.ingredients.map(ingredient => {
        return <BuildControl lessButtonHandler={() => props.addIngredientHandler({type: ingredient.type, amount: -1})}
                             moreButtonHandler={() => props.addIngredientHandler({type: ingredient.type, amount: 1})}
                             lessDisabled={ingredient.amount <= 0}
                             key={ingredient.type}
                             label={`${ingredient.label} ${ingredient.price}$`}></BuildControl>;
    });

    const overallAdded = props.ingredients.reduce((prev, current) => prev + current.amount, 0);

    let orderButton;

    if (props.isAuth) {
        orderButton = <button disabled={overallAdded === 0} className={classes.OrderButton}
                              onClick={props.orderHandler}>ORDER NOW!!1</button>
    } else {
        orderButton = <button disabled={overallAdded === 0} className={classes.OrderButton}
                              onClick={props.orderHandler}>LOG IN TO ORDER</button>
    }

    return (
        <div className={classes.BuildControls}>
            <p>Current price {props.totalPrice}$</p>
            {buttons}
            {orderButton}
        </div>
    );
}

export default buildControls;