import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "react-feather";
import ModalVideo from "react-modal-video";
import Local_Setup from "../../dox/Local_Setup.pdf";
import ImageComponent from "./ImageComponent";
import p1 from "./p1.JPG";

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
        <h1>About Mars EMS</h1>
        <hr />
        <h4 className="text-secondary">Terms and Conditions:</h4>
        <p>
          This app is used for demonstration purposes only. In order to log in,
          you have to sign in with a Google account so they can provide you with
          an API token (Google Spreadsheets API key to be precise), but in order
          not to compromise your own data, the app is restricted to one mail
          which is the following:{" "}
        </p>
        <hr />
        <p>
          <span className="text-secondary">
            <b>Email: </b>
          </span>
          <b>bigga.test.2018@gmail.com</b>
          <br />
          <span className="text-secondary">
            <b>Password:</b>{" "}
          </span>
          <b>test_123</b>
        </p>

        {/* <div className="row navigation-row"> */}
        <p>Roger that!</p>
        <Link to="/login" className="btn btn-hollow">
          <ArrowLeft size="18" className="button-left-icon" /> Go to the LOGIN
          page
        </Link>
        {/* </div> */}

        {/* <hr /> */}
        <p>
          <span className="text-secondary">NOTE:</span> It uses two Google
          spreadsheets which are public and saved on my Google Drive and with
          which, you'll be able to interact and test the app to it's fullest.
          You can find the links for them, and I hope you do if you check out
          the instructions PDF file, which you can find in the bottom-right
          corner. It also uses MongoDB (mLab) to store the temporary data of the
          app. Nothing yours is ever saved and remember you're using my Gmail
          account at the end of the day. {""} 😊
        </p>
        <p>
          If you have any further questions I'll be more than happy to answer
          them. In the meantime may I suggest visiting the GitHub repo and
          analyze the code for yourself, download the instruction with further
          explanations, or just watch the video to see what the app is all
          about.
        </p>
        <hr />
        <h4 className="text-secondary">More about the app itself:</h4>
        <h5>
          Mars EMS is a full stack web app build using the MERN stack (amongst
          other things){" "}
          <span role="img" aria-label="">
            📊 📉 📆
          </span>
        </h5>
        <div className="highlightedProject">
          <div className="">
            <ImageComponent img={p1} />
          </div>

          <div className="description">
            <p>
              This is a EMS software - [Employee management system] that can
              help companies reduce their time spent on salaries, penalties,
              bonuses and a lot of other things regarding the accounting
              department, as well as many things regarding HR department [adding
              a new employee is only a few clicks away, and giving an end date
              is only a click away]. It contains many other features, like
              giving loans to employees, tracking their installments, making
              annual/ monthly reports, and so much more. It looks and feels
              great thanks to great structure and design, and even though it
              possesses a lot of features, the complexity is hidden from the end
              user, so it always appears easy to use, no matter what level of
              functionality you choose to use. It uses ReactJS on the frontend
              and NodeJS on the backend.
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
                  href="https://hr-ems.herokuapp.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light"
                >
                  <i
                    className="fas fa-eye fa-2x"
                    style={{ paddingRight: ".5rem" }}
                  />{" "}
                  Live preview
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
                For any additional information and/ or support you can email me{" "}
                <i className="fas fa-at text-secondary" />
                <a href="mailto:dzenis.hankusic@gmail.com"> Dzenis H.</a>
              </p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
