import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReportsDetails from "../components/reports/ReportsDetails";
import * as employeeActions from '../actions/employeeActions';

class ReportsDetailsContainerComponent extends Component {
    render() {
        return (
            <div>
                <ReportsDetails 
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...employeeActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsDetailsContainerComponent);