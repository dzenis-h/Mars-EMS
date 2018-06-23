import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import PrimaryLayout from "../components/layout/PrimaryLayout";
import {withRouter} from 'react-router'

class PrimaryLayoutContainerComponent extends React.Component {
    render() {
        return (
            <div>
                <PrimaryLayout loggedUser={this.props.loggedUser}
                               history={this.props.history}
                               removeLoggedUser={this.props.actions.removeLoggedUser}
                />
            </div>
        )
    }
}

PrimaryLayoutContainerComponent.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrimaryLayoutContainerComponent));


