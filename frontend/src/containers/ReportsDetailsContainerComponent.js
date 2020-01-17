import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ReactLoading from "react-loading";

import ReportsDetails from "../components/reports/ReportsDetails";
import * as employeeActions from "../actions/employeeActions";
import * as detailsActions from "../actions/reportsDetailsActions";

import { saveSelectedDate } from "../actions/selectedDateActions";

class ReportsDetailsContainerComponent extends Component {
  state = {
    isLoading: true // initially, we assume that there's no data
  };

  componentDidMount() {
    this.helperFunc();
  }

  helperFunc = () => {
    // Getting the data from previous view -> ReportsComponent
    const { relYear, relMonth } = this.props.history.location.state.dev;
    // const {  } = this.props.history.location.state.dev;
    // Formating the date to be able to compare the later on on the backend
    const selectedMonth = moment()
      .month(relMonth)
      .format("MM");
    const finalSelect = parseInt(relYear + selectedMonth, 10);
    // Make sure Redux gets the selected Date for future comparison
    this.props.actions.saveSelectedDate(finalSelect);
    // Initially, this is undefined, so we fetch the data, later on, we do the necessary comparison
    const { selectedDate } = this.props;

    if (!selectedDate || selectedDate !== finalSelect) {
      // POST the 'selected date' to the BE and use the response for the view
      this.props.actions.getReportDetailsAsync({ selectedDate: finalSelect });
    } else {
      this.setState({ isLoading: false }); // the data is already here
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.details !== this.props.details) {
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
    details: state.reportsDetails,
    selectedDate: state.selectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...employeeActions,
        ...detailsActions,
        saveSelectedDate
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsDetailsContainerComponent);
