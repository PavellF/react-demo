import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {logout} from "../../../store/actions/auth";
import {Redirect} from "react-router";

const Logout = props => {

    useEffect(() => {
        props.doLogout();
    }, []);

    return (<Redirect to={"/builder"}/>);
}

const mapStateToProps = (reducerState) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);