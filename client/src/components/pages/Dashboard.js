import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";

const student = require("../../img/student.jpg");
const staff = require("../../img/staff.jpeg");
const report = require("../../img/bedroom.jpeg");
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="min-height container">
        <div className="w-100 text-center h3 welcome-name">
          {/* // eslint-disable-next-line */}
          <marquee className="border border-dark p-3 rounded text-white welcome-text bg-translucent">
            Welcome {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
          </marquee>
        </div>

        <div className="row top-margin">
          <div className="col-sm">
            <div className=" d-flex justify-content-center align-items-center students shadow overlay-container">
              <p className="position-absolute student-text text-white rounded">
                Students
              </p>
              <img
                src={student}
                alt="students"
                className="imageToBeOverlayed"
              />
              <div class="overlay">
                <div class="text">
                  <a
                    href="/student"
                    className="text-decoration-none text-white rounded student-text bg-danger"
                  >
                    Enter&nbsp;<i class="material-icons">launch</i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className=" d-flex justify-content-center align-items-center students shadow overlay-container">
              <p className="position-absolute student-text text-white rounded">
                Report
              </p>
              <img src={report} alt="students" className="imageToBeOverlayed" />
              <div class="overlay">
                <div class="text">
                  <a
                    href="/block"
                    className="text-decoration-none text-white rounded student-text bg-danger"
                  >
                    Enter&nbsp;<i class="material-icons">launch</i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className=" d-flex justify-content-center align-items-center students shadow overlay-container">
              <p className="position-absolute student-text text-white rounded">
                Management
              </p>
              <img src={staff} alt="students" className="imageToBeOverlayed" />
              <div class="overlay">
                <div class="text">
                  <a
                    href="/management"
                    className="text-decoration-none text-white rounded student-text bg-danger"
                  >
                    Enter&nbsp;<i class="material-icons">launch</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUser })(Dashboard);
