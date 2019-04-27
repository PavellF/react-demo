import React from 'react';
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>

            <DrawerToggle clickHandler={props.logoClickHandler}></DrawerToggle>
            <div className={classes.Logo}>
                <Logo></Logo>
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} ></NavigationItems>
            </nav>

        </header>
    );
}

export default toolbar;