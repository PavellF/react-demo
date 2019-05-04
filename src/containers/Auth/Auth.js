import React, {useState, useEffect} from "react";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from './Auth.module.css'
import {auth, setAuthRedirectPath} from "../../store/actions/auth";
import {Redirect} from "react-router";
import {checkValidity, isFormValid} from "../../shared/utility";

const Auth = props => {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'email',
            elementConfig: {
                type: "email",
                placeholder: "Your Email"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: null,
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: "text",
                placeholder: "Password"
            },
            value: "",
            validation: {
                required: true,
                min: 6,
                max: 64
            },
            valid: null,
        },

    });
    const [isSignUp, setSignUp] = useState(true);

    useEffect(() => {
        if (props.isBurgerBuildingActive) {
            props.onSetRedirectPath("/checkout");
        } else {
            props.onSetRedirectPath("/builder");
        }
    }, []);

    const inputChanged = (key, event) => {

        const updatedInput = Object.assign({}, authForm[key], {
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[key].validation)
        });

        const newAuthForm = Object.assign({}, authForm, {[key]: updatedInput});
        setAuthForm(newAuthForm);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const credentials = {
            email: authForm.email.value,
            password: authForm.password.value,
            returnSecureToken: true
        };
        props.doAuth(credentials, isSignUp);
    }

    const switchAuthMethodHandler = () => {
        setSignUp(prev => !prev);
    }

    if (props.authenticated) {
        return (<Redirect to={props.authRedirectPath}/>);
    }

    let form;
    let error = null;

    if (props.error) {
        error = <p><strong>{props.error.message}</strong></p>;
    }

    if (props.loading) {
        form = <Spinner/>;
    } else {
        const authFormEntries = Object.entries(authForm);
        const inputs = [];

        for (let [key, input] of authFormEntries) {
            const element = (<Input key={key} inputType={input.elementType}
                                    elementConfig={input.elementConfig}
                                    value={input.value}
                                    valid={input.valid}
                                    changed={inputChanged.bind(this, key)}/>);
            inputs.push(element);
        }

        form = (
            <form onSubmit={onSubmitHandler}>
                {inputs}
                <Button buttonType="Success" disabled={!isFormValid(authForm)}>SUBMIT</Button>
            </form>
        );
    }

    return (
        <div className={classes.Auth}>
            {form}
            {error}
            <Button buttonType="Danger" onClick={switchAuthMethodHandler}>
                SIGN {isSignUp ? "UP" : "IN"}</Button>
        </div>
    )

}

const mapStateToProps = (reducerState) => {
    return {
        error: reducerState.auth.error,
        loading: reducerState.auth.loading,
        authenticated: reducerState.auth.token !== null,
        authRedirectPath: reducerState.auth.authRedirect,
        isBurgerBuildingActive: reducerState.burgerBuilder.buildingIsActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doAuth: (credentials, isSignUp) => dispatch(auth(credentials, isSignUp)),
        onSetRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));