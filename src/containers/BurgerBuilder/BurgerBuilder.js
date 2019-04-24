import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders.js';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from "react-redux";
import {ADD_INGREDIENT, SET_INGREDIENT} from "../../store/actionsEnum";

export const START_PRICE = 4;

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            igredientsLoading: false,
            error: false
        };
    }

    componentDidMount() {
        this.setState({igredientsLoading: true});
        axios.get("ingredients.json").then(response => {
            //const response1 = response.data;
            this.props.setIngredients([
                {type: "Salad", label: "Salad", amount: 0, price: 2},
                {type: "Bacon", label: "Bacon", amount: 0, price: 9},
                {type: "Cheese", label: "Cheese", amount: 0, price: 7},
                {type: "Meat", label: "Meat", amount: 0, price: 5},
            ]);
            this.setState({
                igredientsLoading: false
            });
        }).catch(error => {
            this.setState({error: true, igredientsLoading: false})
        });
    }

    orderHandler = () => {
        this.setState((prevState) => {
            return {modalActive: !prevState.modalActive};
        });
    }

    confirmOrderHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {

        let modalInner = (<OrderSummary ingredients={this.props.igredients}
                                        totalPrice={this.props.totalPrice}
                                        cancelHandler={this.orderHandler}
                                        continueHandler={this.confirmOrderHandler}></OrderSummary>);

        let ingredientsList = null;

        if (this.state.igredientsLoading) {
            ingredientsList = (
                <div style={{paddingTop: "3rem"}}>
                    <Spinner/>
                </div>
            );
        } else if (this.state.error) {
            ingredientsList = (
                <p>Failed load application</p>
            );
        } else {
            ingredientsList = (
                <React.Fragment>
                    <Burger ingredients={this.props.igredients}/>
                    <BuildControls
                        ingredients={this.props.igredients}
                        orderHandler={this.orderHandler}
                        addIngredientHandler={this.props.onAddIngredient}
                        totalPrice={this.props.totalPrice}> </BuildControls>
                </React.Fragment>
            );
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (payload) => dispatch({type: ADD_INGREDIENT, payload}),
        setIngredients: (payload) => dispatch({type: SET_INGREDIENT, payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));