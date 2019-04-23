import React from 'react';
import classes from './Button.module.css';

const button = (props) => {

    const buttonClasses = [classes.Button];
    buttonClasses.push(classes[props.buttonType]);

    return (
        <button disabled={props.disabled}
                onClick={props.onClick}
                className={buttonClasses.join(" ")}>{props.children}</button>
    );
}

export default button;