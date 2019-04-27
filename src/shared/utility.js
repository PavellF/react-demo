import React, {Component, Suspense} from 'react';
import Spinner from "../components/UI/Spinner/Spinner";

export const isFormValid = (form) => {
    const values = Object.values(form);

    for (let formElement of values) {
        if (!formElement.valid) {
            return false;
        }
    }

    return true;
}

export const checkValidity = (value, rules) => {

    if (rules === undefined) {
        return true;
    }

    let isValid = true;

    if (rules.required) {
        isValid = value.trim() != "" && isValid;
    }

    if (rules.min !== undefined) {
        isValid = value.trim().length >= rules.min && isValid;
    }

    if (rules.max !== undefined) {
        isValid = value.trim().length <= rules.max && isValid;
    }

    return isValid;
}

export const WaitingComponent = (Component) => {
    return props => (
        <Suspense fallback={<Spinner/>}>
            <Component {...props} />
        </Suspense>
    );
}