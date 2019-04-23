import React from 'react';
import classes from "./Ingredient.module.css"
import PropTypes from 'prop-types';

const ingredient = (props) => {
    let ingredient;

    if (props.type === 'BreadTop') {
        ingredient = (
            <div className={classes[props.type]}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
        );
    } else {
        ingredient = <div className={classes[props.type]}></div>
    }

    return ingredient;
}

ingredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default ingredient;