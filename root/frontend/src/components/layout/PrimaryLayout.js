import React, { Component } from "react";
import logo from "../../img/logo.png";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import ReportsContainerComponent from "../../containers/ReportsContainerComponent";
import EmployeesContainerComponent from "../../containers/EmployeesContainerComponent";
import Auth from "../../helper/auth";
import LoginContainerComponent from "../../containers/LoginContainerComponent";
import EmployeeProfileContainerComponent from "../../containers/EmployeeProfileContainerComponent";
import HomeContainerComponent from "../../containers/HomeContainerComponent";
import GenerateSalariesContainerComponent from "../../containers/GenerateSalariesContainerComponent";
import ReportsDetailsContainerComponent from "../../containers/ReportsDetailsContainerComponent";
import EmployeeStatsContainerComponent from "../../containers/EmployeeStatsContainerComponent";
import LoansContainerComponent from "../../containers/LoansContainerComponent";
import About from "../about/About";

class PrimaryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: ""
    };
  }

  logout = () => {
    Auth.signOut();
    this.props.removeLoggedUser();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentRoute: nextProps.history.location.pathname
    });
  }

  componentWillMount() {
    this.setState({
      currentRoute: this.props.history.location.pathname
    });
  }

  render() {
    const { loggedUser } = this.props;
    const { currentRoute } = this.state;
    return (
      <div className="wrapper">
        <header className="" role="banner">
          {loggedUser && (
            <div className="container">
              <div className="navbar navbar__container">
                <Link to="/home">
                  <img src={logo} alt="EMS Mars logo" className="logo" />
                </Link>
                <ul className="navbar__menu">
                  <li className={currentRoute === "/home" ? "active" : ""}>
                    <Link to="/home"> Home </Link>
                  </li>

                  <li className={currentRoute === "/employees" ? "active" : ""}>
                    <Link to="/employees"> Employees </Link>
                  </li>

                  <li className={currentRoute === "/reports" ? "active" : ""}>
                    <Link to="/reports"> Reports </Link>
                  </li>

                  <li className={currentRoute === "/loans" ? "active" : ""}>
                    <Link to="/loans"> Loans </Link>
                  </li>

                  <li className={currentRoute === "/salaries" ? "active" : ""}>
                    <Link to="/salaries"> Salaries </Link>
                  </li>

                  <li className={currentRoute === "/about" ? "active" : ""}>
                    <Link to="/about"> About </Link>
                  </li>
                </ul>
                <Link
                  to="/login"
                  onClick={this.logout}
                  className="navbar__links"
                >
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </header>
        <main>
          <Switch>
            <Route path="/home" component={HomeContainerComponent} />
            <Route path="/login" component={LoginContainerComponent} />
            <Route exact path="/loans" component={LoansContainerComponent} />
            <Route
              path="/salaries"
              component={GenerateSalariesContainerComponent}
            />
            <Route
              exact
              path="/employees"
              component={EmployeesContainerComponent}
            />
            <Route
              path="/employees/:itemId"
              component={EmployeeProfileContainerComponent}
            />
            <Route
              exact
              path="/reports"
              component={ReportsContainerComponent}
            />
            <Route
              exact
              path="/reports/details"
              component={ReportsDetailsContainerComponent}
            />
            <Route
              path="/reports/details/:itemId"
              component={EmployeeStatsContainerComponent}
            />
            <Route exact path="/about" component={About} />

            <Redirect to="/about" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default PrimaryLayout;
