import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from "../../assets/images/27.1 burger-logo.png.png";

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt={"burger logo"}/>
        </div>
    );
}

export default logo;