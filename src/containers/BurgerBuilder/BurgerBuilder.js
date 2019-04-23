import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders.js';
import Spinner from "../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

export const START_PRICE = 4;

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            igredients: [],
            totalPrice: START_PRICE,
            modalActive: false,
            igredientsLoading: false,
            error: false
        };
    }

    componentDidMount() {
        this.setState({igredientsLoading: true});
        axios.get("ingredients.json").then(response => {
            //const response1 = response.data;
            this.setState({
                igredients: [
                    {type: "Salad", label: "Salad", amount: 0, price: 2},
                    {type: "Bacon", label: "Bacon", amount: 0, price: 9},
                    {type: "Cheese", label: "Cheese", amount: 0, price: 7},
                    {type: "Meat", label: "Meat", amount: 0, price: 5},
                ],
                igredientsLoading: false
            });
        }).catch(error => {
            this.setState({error: true, igredientsLoading: false})
        });
    }

    safeSubtraction = (a, b) => {
        const result = a + b;
        return result < 0 ? 0 : result;
    }

    orderHandler = () => {
        this.setState((prevState) => {
            return {modalActive: !prevState.modalActive};
        });
    }

    confirmOrderHandler = () => {
        const queryParams = `ingredients=${encodeURIComponent(JSON.stringify(this.state.igredients))}`;

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams,
        });
    }

    /**
     * amount - negatives are allowed
     * */
    addIngredientHandler = (type, amount) => {
        this.setState((prevState) => {

            const igredients = prevState.igredients.map(igredient => {
                //ingredients amount can not be negative
                if (igredient.type === type) {
                    return Object.assign({}, igredient,
                        {amount: this.safeSubtraction(igredient.amount, amount)});
                } else {
                    return igredient;
                }
            });

            const totalPrice = igredients.reduce(
                (prev, current) => prev + current.price * current.amount,
                START_PRICE
            );

            return {igredients, totalPrice};
        });
    }

    render() {

        let modalInner = (<OrderSummary ingredients={this.state.igredients}
                                        totalPrice={this.state.totalPrice}
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
                    <Burger ingredients={this.state.igredients}/>
                    <BuildControls
                        ingredients={this.state.igredients}
                        orderHandler={this.orderHandler}
                        addIngredientHandler={this.addIngredientHandler}
                        totalPrice={this.state.totalPrice}> </BuildControls>
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

export default withErrorHandler(BurgerBuilder, axios);