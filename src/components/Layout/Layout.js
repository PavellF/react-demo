import React from 'react';
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    showSideDrawer = () =>  {
        this.setState(prev => {
            return {showSideDrawer: !prev.showSideDrawer};
        });
    }

    render() {

        return (
            <React.Fragment>
                <SideDrawer isAuth={this.props.isAuthenticated} shown={this.state.showSideDrawer} backdropClickHandler={this.showSideDrawer}></SideDrawer>
                <Toolbar isAuth={this.props.isAuthenticated} logoClickHandler={this.showSideDrawer}></Toolbar>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (reducerState) => {
    return {
        isAuthenticated: reducerState.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);