import {START_PRICE} from "../../containers/BurgerBuilder/BurgerBuilder";
import {ADD_INGREDIENT, SET_INGREDIENT} from "../actionsEnum";

const initialState = {
    igredients: [],
    totalPrice: START_PRICE,
};

const safeSubtraction = (a, b) => {
    const result = a + b;
    return result < 0 ? 0 : result;
}

const actions = new Map();

/**
 * amount - negatives are allowed
 * */
actions.set(ADD_INGREDIENT, (state, payload) => {
    const igredients = state.igredients.map(igredient => {
        //ingredients amount can not be negative
        if (igredient.type === payload.type) {
            return Object.assign({}, igredient,
                {amount: safeSubtraction(igredient.amount, payload.amount)});
        } else {
            return igredient;
        }
    });

    const totalPrice = igredients.reduce(
        (prev, current) => prev + current.price * current.amount,
        START_PRICE
    );

    return Object.assign({}, state, {igredients, totalPrice});
});

actions.set(SET_INGREDIENT, (state, igredients) => {
    return Object.assign({}, state, {igredients});
});

const reducer = (currentState = initialState, action) => {
    const actionFunction = actions.get(action.type);

    if (actionFunction) {
        return actionFunction(currentState, action.payload);
    } else {
        return currentState;
    }
}

export default reducer;