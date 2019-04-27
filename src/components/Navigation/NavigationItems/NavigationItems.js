import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {

    if (props.isAuth) {
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link={"/builder"}>Burger Builder</NavigationItem>
                <NavigationItem link={"/orders"}>Checkout</NavigationItem>
                <NavigationItem link={"/logout"}>Logout</NavigationItem>
            </ul>
        );
    } else {
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link={"/builder"}>Burger Builder</NavigationItem>
                <NavigationItem link={"/auth"}>Authenticate</NavigationItem>
            </ul>
        );
    }

}

export default (navigationItems);