import React, { Component, Fragment } from "react";
import Modal from "react-awesome-modal";

class ImageComponent extends Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <Fragment>
        <img
          style={{ cursor: "pointer" }}
          src={this.props.img}
          onClick={this.handleShowDialog}
          alt={this.props.title}
        />
        <Modal
          visible={this.state.isOpen}
          effect="fadeInUp"
          onClickAway={() => this.handleShowDialog()}
        >
          <img
            className="openImageModal"
            src={this.props.img}
            onClick={this.handleShowDialog}
            alt={this.props.title}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default ImageComponent;
