import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

const Checkout = props => {

    const onCheckoutCancel = () => {
        props.history.goBack();
    }

    const onCheckoutContinue = () => {
        props.history.replace('/checkout/contact-data');
    }

    if (props.igredients === null) {
        return (<Redirect to={"/builder"}/>);
    }

    return (
        <div>
            <CheckoutSummary ingredients={props.igredients}
                             onCancel={onCheckoutCancel}
                             onContinue={onCheckoutContinue}></CheckoutSummary>
            <Route path={`${props.match.path}/contact-data`}
                   render={(props) => (<ContactData></ContactData>)}></Route>
        </div>
    );
}

const mapStateToProps = (reducerState) => {
    return {
        igredients: reducerState.burgerBuilder.igredients,
        totalPrice: reducerState.burgerBuilder.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);