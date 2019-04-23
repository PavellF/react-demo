import React from 'react';
import Button from "../../../containers/UI/Button/Button";

const orderSummary = (props) => {

    const ingredientSummary = props.ingredients.map(ingredient => {
        return (
        <li key={ingredient.type}>
            <strong>{ingredient.amount}</strong>
            {` ${ingredient.label.toUpperCase()}: ${ingredient.price * ingredient.amount}$`}
        </li>
        );
    });

    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>Burger witch following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price {props.totalPrice}$</strong></p>
            <p>Continue to checkout?</p>
            <Button onClick={props.cancelHandler} buttonType={"Danger"}>CANCEL</Button>
            <Button onClick={props.continueHandler} buttonType={"Success"}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default orderSummary;