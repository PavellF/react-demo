import {START_PRICE} from "../../containers/BurgerBuilder/BurgerBuilder";
import {ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, SET_INGREDIENT} from "../actions/actionsEnum";

const initialState = {
    igredients: null,
    totalPrice: START_PRICE,
    error: false,
    buildingIsActive: false,
};

const safeSubtraction = (a, b) => {
    const result = a + b;
    return result < 0 ? 0 : result;
}

const reducer = (currentState = initialState, action) => {

    switch (action.type) {
        case SET_INGREDIENT: {
            return Object.assign({}, currentState, {
                igredients: action.payload,
                totalPrice: START_PRICE,
                buildingIsActive: false
            });
        }
        case ADD_INGREDIENT: {
            //amount - negatives are allowed
            const igredients = currentState.igredients.map(ingredient => {
                //ingredients amount can not be negative
                if (ingredient.type === action.payload.type) {
                    return Object.assign({}, ingredient,
                        {amount: safeSubtraction(ingredient.amount, action.payload.amount)});
                } else {
                    return ingredient;
                }
            });

            const totalPrice = igredients.reduce(
                (prev, current) => prev + current.price * current.amount,
                START_PRICE
            );

            return Object.assign({}, currentState, {
                igredients,
                totalPrice,
                error: false,
                buildingIsActive: true
            });
        }
        case FETCH_INGREDIENTS_FAILED: {
            return Object.assign({}, currentState, {error: true, buildingIsActive: false});
        }
        default: {
            return currentState;
        }
    }

}

export default reducer;