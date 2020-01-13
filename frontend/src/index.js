import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import registerServiceWorker from "./registerServiceWorker";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./css/style.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-widgets/dist/css/react-widgets.css";
import "rodal/lib/rodal.css";
import "react-select/dist/react-select.css";
import configureStore from "./store/configureStore";
import Provider from "react-redux/es/components/Provider";
import Auth from "./helper/auth";
import { getLoggedUser } from "./actions/userActions";
import { checkIfAppIsGoogleSpreadsheetAuthenticated } from "./actions/googleSpreadsheetActions";

const store = configureStore();
store.dispatch(checkIfAppIsGoogleSpreadsheetAuthenticated());
const loggedUser = localStorage.getItem("email") || null;
store.dispatch(getLoggedUser(loggedUser));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

Auth.init();
// registerServiceWorker();
