import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import LoginComponent from "../components/login/Login";

class LoginContainerComponent extends Component {
    render() {
        return (
            <div>
                <LoginComponent loggedUser={this.props.loggedUser}
                                getLoggedUser={this.props.actions.getLoggedUser}
                                history={this.props.history}
                                removeLoggedUser={this.props.actions.removeLoggedUser}
                />
            </div>
        )
    }
}

LoginContainerComponent.propTypes = {
    loggedUser: PropTypes.string,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {loggedUser: state.loggedUser}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);
