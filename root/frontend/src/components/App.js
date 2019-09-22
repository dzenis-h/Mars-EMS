import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import PrimaryLayoutContainerComponent from "../containers/PrimaryLayoutContainerComponent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PrimaryLayoutContainerComponent {...this.props} />
      </BrowserRouter>
    );
  }
}
export default App;
