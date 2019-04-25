import {
    FETCH_ORDERS,
    FETCH_ORDERS_FAILED,
    POST_ORDER_FAILED,
    POST_ORDER_START,
    POST_ORDER_SUCCESS
} from "../actions/actionsEnum";

const initialState = {
    orders: null,
    error: false,
    postOrderStatus: null,
    postOrderError: null
};

const reducer = (currentState = initialState, action) => {

    switch (action.type) {
        case FETCH_ORDERS: {
            return Object.assign({}, currentState, {orders: action.payload, error: false});
        }
            break;
        case FETCH_ORDERS_FAILED: {
            return Object.assign({}, currentState, {error: true});
        }
            break;
        case POST_ORDER_START: {
            return Object.assign({}, currentState, {postOrderStatus: "STARTED"});
        }
            break;
        case POST_ORDER_SUCCESS: {
            const orders = currentState.orders || [];
            action.payload.order.id = action.payload.id;
            orders.concat(action.payload.order);
            return Object.assign({}, currentState, {postOrderStatus: "SUCCESS", orders});
        }
            break;
        case POST_ORDER_FAILED: {
            return Object.assign({}, currentState,
                {postOrderStatus: "FAILED", postOrderError: action.payload});
        }
            break;
        default: {
            return currentState;
        }
    }

}

export default reducer;