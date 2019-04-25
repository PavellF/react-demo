import axios from "../../axios-orders";
import {
    FETCH_ORDERS,
    FETCH_ORDERS_FAILED,
    POST_ORDER_FAILED,
    POST_ORDER_START,
    POST_ORDER_SUCCESS
} from "./actionsEnum";


export const fetchOrders = () => {
    return dispatch => {
        axios.get("orders.json").then(response => {
            const ordersData = Object.entries(response.data);
            const orders = [];

            for (let [id, order] of ordersData) {
                order.id = id;
                orders.push(order);
            }

            dispatch({
                payload: orders,
                type: FETCH_ORDERS
            });
        }).catch(error => {
            dispatch({
                type: FETCH_ORDERS_FAILED
            });
        });
    }
}

export const postOrder = (payload) => {
    return dispatch => {
        dispatch({type: POST_ORDER_START});

        axios.post("/orders.json", payload).then(response => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                payload: {
                    id: response.data.name,
                    order: payload
                }
            });
        }).catch(error => {
            dispatch({
                type: POST_ORDER_FAILED,
                payload: error
            });
        })
    }
}