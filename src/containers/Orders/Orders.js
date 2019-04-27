import React from "react";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from "react-redux";
import {fetchOrders} from "../../store/actions/order";

class Orders extends React.Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;

        if (this.props.orders === null) {
            orders = <Spinner></Spinner>
        } else if (this.props.error) {
            orders = <p>Could not load orders</p>
        } else if (this.props.orders) {
            orders = this.props.orders.map(order => <Order key={order.id} order={order}></Order>)
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (reducerState) => {
    return {
        orders: reducerState.orders.orders,
        error: reducerState.orders.error,
        token: reducerState.auth.token,
        userId: reducerState.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));