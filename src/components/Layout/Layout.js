import React, {useState} from 'react';
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const showSideDrawerHandler = () => {
        setShowSideDrawer(prev => !prev);
    }

    return (
        <React.Fragment>
            <SideDrawer isAuth={props.isAuthenticated} shown={showSideDrawer}
                        backdropClickHandler={showSideDrawerHandler}></SideDrawer>
            <Toolbar isAuth={props.isAuthenticated} logoClickHandler={showSideDrawerHandler}></Toolbar>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );

}

const mapStateToProps = (reducerState) => {
    return {
        isAuthenticated: reducerState.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);