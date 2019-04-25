import React from "react";
import classes from './Order.module.css'
import {START_PRICE} from "../../containers/BurgerBuilder/BurgerBuilder";

const order = (props) => {

    const ingredients = props.order.igredients || [];
    const ingredientsFiltered = ingredients.filter(i => i.amount > 0);

    const sum = ingredientsFiltered
        .reduce((prev, current) => prev + (current.price * current.amount), 0);
    const ingredientsList = ingredientsFiltered.map(i => (
        <span key={i.name} style={{textTransform: 'capitalize',
        display: "inline-block", margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
        >{`${i.amount}x ${i.label} for ${i.amount * i.price}$`}</span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsList}</p>
            <p>Price is <strong>{`${START_PRICE + sum}$ (Start price is ${START_PRICE}$)`}</strong></p>
        </div>
    );
}

export default order;