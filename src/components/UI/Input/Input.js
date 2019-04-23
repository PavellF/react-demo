import React from "react";
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.valid !== null && props.valid === false) {
        inputClasses.push(classes.Invalid);
    }

    if (props.inputType === 'textarea') {
        inputElement = (<textarea onChange={props.changed} className={inputClasses.join(" ")}
                                 {...props.elementConfig} value={props.value} />);
    } else if (props.inputType === 'select') {
        const options = props.elementConfig.options
            .map(option => (<option key={option.value} value={option.value}>{option.displayValue}</option>));
        inputElement = (
            <select onChange={props.changed} className={inputClasses.join(" ")} value={props.value}>
                {options}
            </select>
        );
    } else {
        inputElement = (<input onChange={props.changed} className={inputClasses.join(" ")}
                              {...props.elementConfig} value={props.value} />);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;