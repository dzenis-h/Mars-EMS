import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Home from "../components/home/Home";
import * as googleSpreadsheetActions from "../actions/googleSpreadsheetActions";
import * as employeeActions from "../actions/employeeActions";
import * as reportsActions from "../actions/reportsActions";
import * as loansActions from "../actions/loansActions";

class HomeContainerComponent extends Component {
  render() {
    return (
      <div>
        <Home
          isAppGoogleSpreadsheetAuthenticated={
            this.props.isAppGoogleSpreadsheetAuthenticated
          }
          setGoogleSpreadsheetAuth={this.props.actions.setGoogleSpreadsheetAuth}
          unsetGoogleSpreadsheetAuth={
            this.props.actions.unsetGoogleSpreadsheetAuth
          }
          getEmployeesAsync={this.props.actions.getEmployeesAsync}
          getReportsAsync={this.props.actions.getReportsAsync}
          getLoansAsync={this.props.actions.getLoansAsync}
          employees={this.props.employees}
          reports={this.props.reports}
          loans={this.props.loans}
          history={this.props.history}
        />
      </div>
    );
  }
}

HomeContainerComponent.propTypes = {
  employees: PropTypes.array,
  reports: PropTypes.object,
  loans: PropTypes.object,
  isAppGoogleSpreadsheetAuthenticated: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAppGoogleSpreadsheetAuthenticated:
      state.isAppGoogleSpreadsheetAuthenticated,
    employees: state.employees,
    reports: state.reports,
    loans: state.loans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...googleSpreadsheetActions,
        ...employeeActions,
        ...reportsActions,
        ...loansActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainerComponent);
