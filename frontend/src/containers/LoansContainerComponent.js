import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as employeeActions from "../actions/employeeActions";
import * as loansActions from "../actions/loansActions";
import Loans from "../components/loans/Loans";

import _ from "lodash";

class LoansContainerComponent extends Component {
  state = {
    isLoading: false
  };

  // After the API code gets verified, the user gets redirected to the Home component and additionally,
  // the app fires off 3 action creators => To get the employees, reports, and loans-related data.

  componentDidMount() {
    if (_.isEmpty(this.props.loans)) {
      this.setState({ isLoading: true });
      // This is just in case the user is already verified and for some reason decides to visit directly this page.

      this.props.actions.getLoansAsync();
    }
  }

  // If new props are available that means that the above code has been executed which means
  // Loading is active, so now we should set it to false again and pass the value to the child component.
  componentWillReceiveProps(newProps) {
    if (newProps.loans !== this.props.loans) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div>
        <Loans
          getLoansAsync={this.props.actions.getLoansAsync}
          loans={this.props.loans}
          employees={this.props.employees}
          history={this.props.history}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

LoansContainerComponent.propTypes = {
  employees: PropTypes.array.isRequired,
  loans: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    employees: state.employees,
    loans: state.loans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...employeeActions, ...loansActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoansContainerComponent);
