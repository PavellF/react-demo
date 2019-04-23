import React from 'react';
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
                <SideDrawer shown={this.state.showSideDrawer} backdropClickHandler={this.showSideDrawer}></SideDrawer>
                <Toolbar logoClickHandler={this.showSideDrawer}></Toolbar>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;