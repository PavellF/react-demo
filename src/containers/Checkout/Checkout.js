import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {

    state = {
        ingredients: [],
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = JSON.parse(query.get("ingredients"));

        if (Array.isArray(ingredients)) {
            this.setState({ingredients});
        }
    }

    onCheckoutCancel = () =>  {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 onCancel={this.onCheckoutCancel}
                                 onContinue={this.onCheckoutContinue}></CheckoutSummary>
                <Route path={`${this.props.match.path}/contact-data`}
                       render={(props) => (<ContactData
                           ingredients={this.state.ingredients}
                           {...props}></ContactData>)}></Route>
            </div>
        );
    }
}

export default Checkout;