import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component {

    state = {
        orderForm: {
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
        },
        orderSending: false,
    }

    componentDidMount() {

    }

    checkValidity = (value, rules) => {

        if (rules === undefined) {
            return true;
        }

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() != "" && isValid;
        }

        if (rules.min !== undefined) {
            isValid = value.trim().length >= rules.min && isValid;
        }

        if (rules.max !== undefined) {
            isValid = value.trim().length <= rules.max && isValid;
        }

        return isValid;
    }

    isFormValid = () => {
        const values = Object.values(this.state.orderForm);

        for (let formElement of values) {
            if (!formElement.valid) {
                return false;
            }
        }

        return true;
    }

    submitOrderHandler = (event) => {
        event.preventDefault();

        const order = {
            igredients: this.props.ingredients,
            customer: {
                name: this.state.orderForm.name.value,
                email: this.state.orderForm.email.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zip: this.state.orderForm.postalCode.value,
                    country: this.state.orderForm.country.value
                }
            },
            deliveryMethod: this.state.orderForm.value
        };

        this.setState({orderSending: true});

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({orderSending: false});
                this.props.history.push("/builder");
            })
            .catch(error => console.log(error))
            .finally(() => void 0);
    }

    inputChanged = (key, event) => {

        const updatedInput = Object.assign({}, this.state.orderForm[key], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.orderForm[key].validation)
        });

        const orderForm = Object.assign({}, this.state.orderForm, {[key]: updatedInput});
        this.setState({orderForm});
    }

    render() {

        let form = null;

        if (this.state.orderSending) {
            form = <Spinner></Spinner>
        } else {

            const orderForm = Object.entries(this.state.orderForm);
            const inputs = [];

            for (let [key, input] of orderForm) {
                const element = (<Input key={key} inputType={input.elementType}
                                        elementConfig={input.elementConfig}
                                        value={input.value}
                                        valid={input.valid}
                                        changed={this.inputChanged.bind(this, key)}/>);
                inputs.push(element);
            }

            form = (
                <form onSubmit={this.submitOrderHandler}>
                    {inputs}
                    <Button buttonType="Success" disabled={!this.isFormValid()}>ORDER</Button>
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
}

export default ContactData;