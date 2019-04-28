import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders.js';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from "react-redux";
import {addIngredient, fetchIngredients} from "../../store/actions/burgerBuilder";
import {setAuthRedirectPath} from "../../store/actions/auth";

export const START_PRICE = 4;

export class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
        };
    }

    componentDidMount() {
        this.props.onFetchIngredients();
    }

    orderHandler = () => {

        if (this.props.authenticated) {
            this.setState((prevState) => {
                return {modalActive: !prevState.modalActive};
            });
        } else {
            this.props.onSetRedirectPath('/auth');
            this.props.history.push('/auth');
        }

    }

    confirmOrderHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {

        let modalInner = null;
        let ingredientsList = null;

        if (this.props.igredients === null) {
            ingredientsList = (
                <div style={{paddingTop: "3rem"}}>
                    <Spinner/>
                </div>
            );
        } else if (this.props.error) {
            ingredientsList = (
                <p>Failed load application</p>
            );
        } else {
            ingredientsList = (
                <React.Fragment>
                    <Burger ingredients={this.props.igredients}/>
                    <BuildControls
                        isAuth={this.props.authenticated}
                        ingredients={this.props.igredients}
                        orderHandler={this.orderHandler}
                        addIngredientHandler={this.props.onAddIngredient}
                        totalPrice={this.props.totalPrice}> </BuildControls>
                </React.Fragment>
            );
            modalInner = (<OrderSummary ingredients={this.props.igredients}
                                        totalPrice={this.props.totalPrice}
                                        cancelHandler={this.orderHandler}
                                        continueHandler={this.confirmOrderHandler}></OrderSummary>);
        }

        return (
            <React.Fragment>
                {ingredientsList}
                <Modal show={this.state.modalActive}
                       modalCloseHandler={this.orderHandler}>
                    {modalInner}
                </Modal>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (reducerState) => {
    return {
        igredients: reducerState.burgerBuilder.igredients,
        totalPrice: reducerState.burgerBuilder.totalPrice,
        error: reducerState.burgerBuilder.error,
        authenticated: reducerState.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (payload) => dispatch(addIngredient(payload)),
        onFetchIngredients: () => dispatch(fetchIngredients()),
        onSetRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));