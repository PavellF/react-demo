import React, {Component} from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import {checkAuthState} from "./store/actions/auth";
import {WaitingComponent} from "./shared/utility";

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(() => import("./containers/Orders/Orders"));
const AsyncAuth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
    render() {
        this.props.autoAuth();

        if (this.props.authenticated) {
            return (
                <div className="App">
                    <Layout>
                        <Switch>
                            <Route component={BurgerBuilder} path={"/builder"}></Route>
                            <Route component={WaitingComponent(AsyncCheckout)} path={"/checkout"}></Route>
                            <Route component={WaitingComponent(AsyncOrders)} path={"/orders"}></Route>
                            <Route component={WaitingComponent(AsyncAuth)} path={"/auth"}/>
                            <Route component={Logout} path={"/logout"}/>
                            <Redirect to={"/builder"}/>
                        </Switch>
                    </Layout>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Layout>
                        <Switch>
                            <Route component={BurgerBuilder} path={"/builder"}></Route>
                            <Route component={WaitingComponent(AsyncAuth)} path={"/auth"}/>
                            <Redirect to={"/builder"}/>
                        </Switch>
                    </Layout>
                </div>
            );
        }
    }
}

const mapStateToProps = (reducerState) => {
    return {
        authenticated: reducerState.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        autoAuth: () => dispatch(checkAuthState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
