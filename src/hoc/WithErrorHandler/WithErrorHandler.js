import React from 'react';
import Modal from "../../containers/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends React.Component {

        state = {
            error: null
        };

        constructor(props) {
            super(props);

            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(r => r, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalCloseHandler={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </React.Fragment>
            );
        }
    };
}

export default withErrorHandler;