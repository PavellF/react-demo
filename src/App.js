import React, {Component} from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from "react-router";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route component={BurgerBuilder} path={"/builder"}></Route>
                        <Route component={Checkout} path={"/checkout"}></Route>
                        <Route component={Orders} path={"/orders"}></Route>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
