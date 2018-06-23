import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../actions/employeeActions';
import Reports from "../components/reports/Reports";

class ReportsContainerComponent extends Component {
    render() {
        return (
            <div>
                <Reports 
                        employees={this.props.employees}
                        history={this.props.history}
                    />
            </div>
        )
    }
}

ReportsContainerComponent.propTypes = {
    employees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...employeeActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainerComponent);