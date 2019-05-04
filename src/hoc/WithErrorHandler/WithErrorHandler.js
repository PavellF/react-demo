import React, {useState, useEffect} from 'react';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const responseInterceptor = axios.interceptors.response.use(r => r, error => {
            setError(error);
        });

        const errorConfirmedHandler = () => {
            setError(null);
        }

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, []);

        return (
            <React.Fragment>
                <Modal show={error} modalCloseHandler={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}></WrappedComponent>
            </React.Fragment>
        );
    };
}

export default withErrorHandler;