import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
// import axios from '../../axios-orders';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state={
            error: null
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null})
        }

        UNSAFE_componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => {
                return res;
            }, err => {
                this.setState({error: err})
            })
        }

        UNSAFE_componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux> 
            )

        }
        
    }
}

export default withErrorHandler;