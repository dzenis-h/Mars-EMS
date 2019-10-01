import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EmployeeStats from "../components/reports/EmployeeStats";
import * as employeeActions from '../actions/employeeActions';


class EmployeeStatsContainerComponent extends Component {
    render() {
        return (
            <div>
                <EmployeeStats 
                        employees={this.props.employees}
                        history={this.props.history}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeStatsContainerComponent);