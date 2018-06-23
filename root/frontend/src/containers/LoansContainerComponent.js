import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../actions/employeeActions';
import Loans from "../components/loans/Loans";

class LoansContainerComponent extends Component {
    render() {
        return (
            <div>
                <Loans
                     employees={this.props.employees} 
                     history={this.props.history}
                    />
            </div>
        )
    }
}

LoansContainerComponent.propTypes = {
    employees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoansContainerComponent);
