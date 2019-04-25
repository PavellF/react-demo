import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import burgerBuilder from './store/reducers/burgerBuilder'
import orders from './store/reducers/order'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    orders: orders,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = (store) => {
    return (next) => {
        return (action) => {
            console.log("Middlevare", action);
            const result = next(action);
            console.log("Middlevare next state", store.getState());
            return result;
        }
    };
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
