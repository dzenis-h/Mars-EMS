import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Home from "../components/home/Home";
import * as googleSpreadsheetActions from "../actions/googleSpreadsheetActions";
import * as employeeActions from "../actions/employeeActions";
import * as reportsActions from "../actions/reportsActions";

class HomeContainerComponent extends React.Component {
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
          employees={this.props.employees}
          reports={this.props.reports}
          history={this.props.history}
        />
      </div>
    );
  }
}

HomeContainerComponent.propTypes = {
  employees: PropTypes.array,
  reports: PropTypes.object,
  isAppGoogleSpreadsheetAuthenticated: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAppGoogleSpreadsheetAuthenticated:
      state.isAppGoogleSpreadsheetAuthenticated,
    employees: state.employees,
    reports: state.reports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...googleSpreadsheetActions, ...employeeActions, ...reportsActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainerComponent);
