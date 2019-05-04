import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import {postOrder} from "../../../store/actions/order";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import {Redirect} from "react-router";
import {checkValidity, isFormValid} from "../../../shared/utility";

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: "text",
                placeholder: "Your Name"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
        email: {
            elementType: 'email',
            elementConfig: {
                type: "email",
                placeholder: "Your Email"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: "text",
                placeholder: "Street"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: "text",
                placeholder: "Postal Code"
            },
            value: "",
            validation: {
                required: true,
                min: 5,
                max: 5
            },
            valid: null,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: "text",
                placeholder: "Country"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: 'FASTEST', displayValue: 'Fastest'}, {
                    value: 'CHEAPEST',
                    displayValue: 'Cheapest'
                }],
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
    });

    const submitOrderHandler = (event) => {
        event.preventDefault();

        const order = {
            igredients: props.igredients,
            userId: props.userId,
            customer: {
                name: orderForm.name.value,
                email: orderForm.email.value,
                address: {
                    street: orderForm.street.value,
                    zip: orderForm.postalCode.value,
                    country: orderForm.country.value
                }
            },
            deliveryMethod: orderForm.value
        };

        props.postOrder(order, props.token);
    };

    const inputChanged = (key, event) => {

        const updatedInput = Object.assign({}, orderForm[key], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[key].validation)
        });

        const newOrderForm = Object.assign({}, orderForm, {[key]: updatedInput});
        setOrderForm(newOrderForm);
    };

    let form = null;

    if (props.postOrderStatus === 'SUCCESS') {
        return (<Redirect to={"/orders"}/>);
    }

    if (props.postOrderStatus === 'STARTED') {
        form = <Spinner></Spinner>
    } else {

        const orderFormEntries = Object.entries(orderForm);
        const inputs = [];

        for (let [key, input] of orderFormEntries) {
            const element = (<Input key={key} inputType={input.elementType}
                                    elementConfig={input.elementConfig}
                                    value={input.value}
                                    valid={input.valid}
                                    changed={inputChanged.bind(this, key)}/>);
            inputs.push(element);
        }

        form = (
            <form onSubmit={submitOrderHandler}>
                {inputs}
                <Button buttonType="Success" disabled={!isFormValid(orderForm)}>ORDER</Button>
            </form>
        );
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = (reducerState) => {
    return {
        igredients: reducerState.burgerBuilder.igredients,
        totalPrice: reducerState.burgerBuilder.totalPrice,
        postOrderStatus: reducerState.orders.postOrderStatus,
        postOrderError: reducerState.orders.postOrderError,
        token: reducerState.auth.token,
        userId: reducerState.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postOrder: (payload, token) => dispatch(postOrder(payload, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));