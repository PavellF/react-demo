import React, {Component, useState, useEffect} from 'react';
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

export const BurgerBuilder = (props) => {

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        props.onFetchIngredients();
    }, []);

    const orderHandler = () => {

        if (props.authenticated) {
            setModalActive(prevState => !prevState);
        } else {
            props.onSetRedirectPath('/auth');
            props.history.push('/auth');
        }

    };

    const confirmOrderHandler = () => {
        props.history.push({
            pathname: '/checkout'
        });
    }


    let modalInner = null;
    let ingredientsList = null;

    if (props.igredients === null) {
        ingredientsList = (
            <div style={{paddingTop: "3rem"}}>
                <Spinner/>
            </div>
        );
    } else if (props.error) {
        ingredientsList = (
            <p>Failed load application</p>
        );
    } else {
        ingredientsList = (
            <React.Fragment>
                <Burger ingredients={props.igredients}/>
                <BuildControls
                    isAuth={props.authenticated}
                    ingredients={props.igredients}
                    orderHandler={orderHandler}
                    addIngredientHandler={props.onAddIngredient}
                    totalPrice={props.totalPrice}> </BuildControls>
            </React.Fragment>
        );
        modalInner = (<OrderSummary ingredients={props.igredients}
                                    totalPrice={props.totalPrice}
                                    cancelHandler={orderHandler}
                                    continueHandler={confirmOrderHandler}></OrderSummary>);
    }

    return (
        <React.Fragment>
            {ingredientsList}
            <Modal show={modalActive}
                   modalCloseHandler={orderHandler}>
                {modalInner}
            </Modal>
        </React.Fragment>
    );

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