import React from 'react';
import classes from "./SideDrawer.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../../containers/UI/Backdrop/Backdrop";

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
            <div className={sideDrawerClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;