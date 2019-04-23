import React from "react";
import Button from "../../UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";

class ContactData extends React.Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        orderSending: false,
    }

    componentDidMount() {

    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        const order = {
            igredients: this.props.ingredients,
            customer: {
                name: "Anna Lee",
                email: "annn@lee.com",
                address: {
                    street: "Pushkin street",
                    zip: "25677",
                    country: "Russo"
                }
            },
            deliveryMethod: "FASTEST"
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

    render() {

        let form = null;

        if (this.state.orderSending) {
            form = <Spinner></Spinner>
        } else {
            form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
                    <Button onClick={this.submitOrderHandler} buttonType="Success">ORDER</Button>
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