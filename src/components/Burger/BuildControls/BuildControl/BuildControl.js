import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <span className={classes.Label}>{props.label}</span>
            <button disabled={props.lessDisabled} onClick={props.lessButtonHandler} className={classes.Less}>Less</button>
            <button onClick={props.moreButtonHandler} className={classes.More}>More</button>
        </div>
    );
}

export default buildControl;