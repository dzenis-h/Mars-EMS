import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReportsDetails from "../components/reports/ReportsDetails";
import * as employeeActions from "../actions/employeeActions";
import * as detailsActions from "../actions/reportsDetailsActions";

class ReportsDetailsContainerComponent extends Component {
  componentWillMount() {
    this.props.actions.getReportDetailsAsync();
  }

  render() {
    return (
      <div>
        <ReportsDetails
          employees={this.props.employees}
          details={this.props.details}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
    details: state.reportsDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...employeeActions, ...detailsActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsDetailsContainerComponent);
