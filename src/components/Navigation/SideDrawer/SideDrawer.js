import React from 'react';
import classes from "./SideDrawer.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {

    const sideDrawerClasses = [classes.SideDrawer];

    if (props.shown) {
        sideDrawerClasses.push(classes.Open);
    } else {
        sideDrawerClasses.push(classes.Close);
    }

    return (
        <React.Fragment>
            <Backdrop show={props.shown} backdropHandler={props.backdropClickHandler}></Backdrop>
            <div className={sideDrawerClasses.join(" ")} onClick={props.backdropClickHandler}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;