import React from 'react';
import classes from './Burger.module.css'
import Ingredient from "./Ingredient/Ingredient";

const burger = (props) => {

    const ingredients = props.ingredients.map(ingredient => {
        const bucket = [];
        for (let i = 0; i < ingredient.amount; i++) {
            bucket.push(<Ingredient key={ingredient.type + i} type={ingredient.type}></Ingredient>);
        }
        return bucket;
    }).reduce((prev, current) => {
        return prev.concat(current);
    }, []);

    if (ingredients.length === 0) {
        ingredients.push(<p key={"0"}>Please start adding ingredients</p>);
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type={"BreadTop"}></Ingredient>
            {ingredients}
            <Ingredient type={"BreadBottom"}></Ingredient>
        </div>
    );
}

export default burger;