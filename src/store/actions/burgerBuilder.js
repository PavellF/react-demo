import {ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, SET_INGREDIENT} from "./actionsEnum";
import axios from "../../axios-orders";

export const addIngredient = (payload) => {
    return {type: ADD_INGREDIENT, payload};
}

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENT,
        payload: ingredients
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get("ingredients.json").then(response => {
            //const response1 = response.data;
            dispatch(setIngredients([
                {type: "Salad", label: "Salad", amount: 0, price: 2},
                {type: "Bacon", label: "Bacon", amount: 0, price: 9},
                {type: "Cheese", label: "Cheese", amount: 0, price: 7},
                {type: "Meat", label: "Meat", amount: 0, price: 5},
            ]));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    }
}