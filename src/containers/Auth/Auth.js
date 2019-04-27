import React from "react";
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

class Auth extends React.Component {

    state = {
        authForm: {
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

        },
        isSignUp: true
    }

    componentDidMount() {
        if (this.props.isBurgerBuildingActive) {
            this.props.onSetRedirectPath("/checkout");
        } else {
            this.props.onSetRedirectPath("/builder");
        }
    }

    inputChanged = (key, event) => {

        const updatedInput = Object.assign({}, this.state.authForm[key], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.authForm[key].validation)
        });

        const authForm = Object.assign({}, this.state.authForm, {[key]: updatedInput});
        this.setState({authForm});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const credentials = {
            email: this.state.authForm.email.value,
            password: this.state.authForm.password.value,
            returnSecureToken: true
        };
        this.props.doAuth(credentials, this.state.isSignUp);
    }

    switchAuthMethodHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {

        if (this.props.authenticated) {
            return (<Redirect to={this.props.authRedirectPath}/>);
        }

        let form;
        let error = null;

        if (this.props.error) {
            error = <p><strong>{this.props.error.message}</strong></p>;
        }

        if (this.props.loading) {
            form = <Spinner/>;
        } else {
            const authForm = Object.entries(this.state.authForm);
            const inputs = [];

            for (let [key, input] of authForm) {
                const element = (<Input key={key} inputType={input.elementType}
                                        elementConfig={input.elementConfig}
                                        value={input.value}
                                        valid={input.valid}
                                        changed={this.inputChanged.bind(this, key)}/>);
                inputs.push(element);
            }

            form = (
                <form onSubmit={this.onSubmitHandler}>
                    {inputs}
                    <Button buttonType="Success" disabled={!isFormValid(this.state.authForm)}>SUBMIT</Button>
                </form>
            );
        }

        return (
            <div className={classes.Auth}>
                {form}
                {error}
                <Button buttonType="Danger" onClick={this.switchAuthMethodHandler}>
                    SIGN {this.state.isSignUp ? "UP" : "IN"}</Button>
            </div>
        )
    }
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