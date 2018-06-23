import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as googleSpreadsheetActions from '../actions/googleSpreadsheetActions';
import * as employeeActions from '../actions/employeeActions';
import Home from "../components/home/Home";

class HomeContainerComponent extends React.Component {
    render() {
        return (
            <div>
                <Home isAppGoogleSpreadsheetAuthenticated={this.props.isAppGoogleSpreadsheetAuthenticated}
                      setGoogleSpreadsheetAuth={this.props.actions.setGoogleSpreadsheetAuth}
                      unsetGoogleSpreadsheetAuth={this.props.actions.unsetGoogleSpreadsheetAuth}
                      getEmployeesAsync={this.props.actions.getEmployeesAsync}
                      employees={this.props.employees}
                      history={this.props.history}
                    />
            </div>
        )
    }
}

HomeContainerComponent.propTypes = {
    isAppGoogleSpreadsheetAuthenticated: PropTypes.bool,
    employees: PropTypes.array,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        isAppGoogleSpreadsheetAuthenticated: state.isAppGoogleSpreadsheetAuthenticated,
        employees: state.employees,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...googleSpreadsheetActions, ...employeeActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainerComponent);
