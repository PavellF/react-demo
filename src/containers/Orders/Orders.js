import React from "react";
import axios from "../../axios-orders";
import Spinner from "../UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends React.Component {

    state = {
        ordersLoading: true,
        orders: []
    }

    componentDidMount() {
        this.setState({ordersLoading: true});
        axios.get("orders.json").then(response => {
            const ordersData = Object.entries(response.data);
            const orders = [];

            for (let [id, order] of ordersData) {
                order.id = id;
                orders.push(order);
            }

            this.setState({
                orders,
                ordersLoading: false
            });
        }).catch(error => {
            this.setState({ordersLoading: false})
        });
    }


    render() {

        let orders = null;

        if (this.state.ordersLoading) {
            orders = <Spinner></Spinner>
        } else if (this.state.orders) {
            orders = this.state.orders.map(order => <Order key={order.id} order={order}></Order>)
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);