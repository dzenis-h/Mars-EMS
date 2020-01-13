import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "react-feather";
import ModalVideo from "react-modal-video";
import Local_Setup from "../../documents/Local_Setup.pdf";
import ImageComponent from "../../helper/ImageComponent";
import p1 from "../../img/p1.JPG";

class About extends Component {
  constructor() {
    super();
    this.state = {
      videoOpen: false
    };
    this.openVideoModal = this.openVideoModal.bind(this);
  }

  openVideoModal() {
    this.setState({ videoOpen: true });
  }

  render() {
    return (
      <div className="container">
        <ModalVideo
          channel="youtube"
          isOpen={this.state.videoOpen}
          videoId="5pUm2DWUgPM"
          onClose={() => this.setState({ videoOpen: false })}
        />
        <div className="row terms">
          <div className="col-12">
            <Link to="/privacy" className="btn btn-hollow btn-xo">
              <FileText size="18" className="button-left-icon" /> Privacy Policy
            </Link>

            <Link to="/terms" className="btn btn-hollow btn-xo">
              <FileText size="18" className="button-right-icon" /> Terms &
              conditions
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1>About Mars EMS</h1>
            <p>This app is for demonstration purposes only.</p>
            <hr />
            <div className="">
              <h5 className="lead">
                <span className="text-secondary">UPDATE:</span> Login
                restriction has been removed.
              </h5>
              <p> Now you can login using your (any) Google account.</p>
            </div>
            <hr />
            <p>
              <i style={{ color: "#00000", fontSize: "1.35rem" }}>
                This software uses <b>Google's OAuth</b> for authentication. To
                login, you have to use a Google account so they can provide you
                with an API token (Google Spreadsheets API key to be precise).{" "}
                <b>No data is being collected</b>
              </i>
            </p>
            <hr />

            <Link to="/login" className="btn btn-hollow">
              <ArrowLeft size="18" className="button-left-icon" /> Go to the
              LOGIN page
            </Link>

            <p>
              <span className="text-secondary">NOTE:</span> It uses two Google
              spreadsheets that are public and saved on my Google Drive and with
              which, you'll be able to interact and test the app to it's
              fullest. You can find the links for them, and I hope you do if you
              check out the instructions PDF file, which you can find in the
              bottom-right corner. It also uses MongoDB (mLab) to store the
              temporary data of the app.
            </p>
            <p>
              If you have any further questions I'll be more than happy to
              answer them. In the meantime may I suggest visiting the GitHub
              repo and analyze the code for yourself, download the instruction
              with further explanations, or just watch the video to see what the
              app is all about.
            </p>
            <hr />
            <h3 className="text-secondary">More about the app itself:</h3>
            <h5>
              Mars EMS is a full stack web app build using the MERN stack
              (amongst other things){" "}
              <span role="img" aria-label="">
                📊 📉 📆
              </span>
            </h5>
            <div className="highlightedProject">
              <div>
                <ImageComponent img={p1} />
              </div>

              <div className="description">
                <p>
                  This is an EMS software - [Employee management system] that
                  can help companies reduce their time spent on salaries,
                  penalties, bonuses and a lot of other things regarding the
                  accounting department, as well as many things regarding HR
                  department [adding a new employee is only a few clicks away,
                  and giving an end date is only a click away]. It contains many
                  other features, like giving loans to employees, tracking their
                  installments, making annual/ monthly reports, and so much
                  more. It looks and feels great thanks to great structure and
                  design, and even though it possesses a lot of features, the
                  complexity is hidden from the end-user, so it always appears
                  easy to use, no matter what level of functionality you choose
                  to use. It uses{" "}
                  <span style={{ color: "#5371e8" }}> ReactJS </span> on the
                  frontend and
                  <span style={{ color: "#66bb6a" }}> NodeJS </span> on the
                  backend.
                </p>
              </div>
              <div className="icons">
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <a href="#!" id="video" onClick={this.openVideoModal}>
                      <i
                        className="fab fa-youtube fa-2x"
                        style={{ paddingRight: ".5rem" }}
                      />
                      Watch Video Preview
                    </a>
                  </li>

                  <li>
                    <a href={Local_Setup} download="Local_Setup">
                      <i
                        className="fas fa-download fa-2x"
                        style={{ paddingRight: ".5rem" }}
                      />{" "}
                      Download Instructions
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://github.com/BiggaHD/Mars-EMS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark"
                    >
                      <i
                        className="fab fa-github fa-2x"
                        style={{ paddingRight: ".5rem" }}
                      />{" "}
                      Github repo
                    </a>
                  </li>
                  <p className="support">
                    For any additional information and/ or support you can email
                    me <i className="fas fa-at text-secondary" />
                    <a href="mailto:dzenis.hankusic@gmail.com"> Dzenis H.</a>
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
