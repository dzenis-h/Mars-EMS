import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as reportsActions from "../actions/reportsActions";
import Reports from "../components/reports/Reports";
import ReactLoading from "react-loading";

import _ from "lodash";

class ReportsContainerComponent extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    if (_.isEmpty(this.props.reports)) {
      // console.log("getReportsAsync RAN");
      this.setState({ isLoading: true });
      this.props.actions.getReportsAsync();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.reports !== this.props.reports) {
      this.setState({ isLoading: false }); // new props are available
    }
  }

  render() {
    if (this.state.isLoading) {
      // if doing asyng things
      return (
        <div className="flexCenter">
          <ReactLoading type={"bars"} color={"#48c6ef"} />
        </div>
      );
    } // render the loading component

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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(reportsActions, dispatch)
  };
};

ReportsContainerComponent.propTypes = {
  reports: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainerComponent);
