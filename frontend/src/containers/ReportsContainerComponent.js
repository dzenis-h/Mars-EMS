import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as reportsActions from "../actions/reportsActions";
import Reports from "../components/reports/Reports";

class ReportsContainerComponent extends Component {
  render() {
    return (
      <div>
        <Reports history={this.props.history} reports={this.props.reports} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reports: state.reports
  };
};

ReportsContainerComponent.propTypes = {
  reports: PropTypes.object
};

export default connect(
  mapStateToProps,
  { reportsActions }
)(ReportsContainerComponent);
