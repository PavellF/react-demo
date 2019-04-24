import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends React.Component {

    componentDidMount() {

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
                <CheckoutSummary ingredients={this.props.igredients}
                                 onCancel={this.onCheckoutCancel}
                                 onContinue={this.onCheckoutContinue}></CheckoutSummary>
                <Route path={`${this.props.match.path}/contact-data`}
                       render={(props) => (<ContactData></ContactData>)}></Route>
            </div>
        );
    }
}

const mapStateToProps = (reducerState) => {
    return {
        igredients: reducerState.burgerBuilder.igredients,
        totalPrice: reducerState.burgerBuilder.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);