import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            onClick={this.onLogOut.bind(this)}
            className="nav-link text-danger"
            to="/"
          >
            LogOut
          </Link>
        </li>
      </ul>
    );

    const unauthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">
            Log In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-nav">
        <a class="navbar-brand" href="#">
          <Link className="navbar-brand  cms  p-1" to="/">
            <span className="text-warning">Ca</span>
            <span className="text-danger">Ma</span>
            <span className="text-success">Sy</span>
          </Link>
        </a>
        <button
          class="navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarText">
          {isAuthenticated ? (
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link
                  className="nav-link border text-white ml-1 pl-2 text-center"
                  id="dashboard"
                  to="/"
                >
                  Dashboard
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link border text-white ml-1 pl-2 text-center"
                  id="student"
                  to="/student"
                >
                  Students
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link border text-white ml-1 pl-2 text-center"
                  id="report"
                  to="/block"
                >
                  Report
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link border text-white ml-1 pl-2 text-center"
                  id="management"
                  to="/management"
                >
                  Management
                </Link>
              </li>
            </ul>
          ) : null}
          <span class="navbar-text">
            {isAuthenticated ? (
              <div class="nav-item dropdown pl-2 text-center">
                <div
                  class="nav-link dropdown-toggle text-white"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="rounded-circle "
                    src={user.avatar}
                    alt={user.name}
                    title="Gravatar Image"
                    style={{ width: "30px", marginRight: "5px" }}
                  />
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </div>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a class="dropdown-item" href="#">
                    Profile
                  </a>

                  <a class="dropdown-item" href="#">
                    {authLinks}
                  </a>
                </div>
              </div>
            ) : (
              unauthLinks
            )}
          </span>
        </div>
      </nav>
      /*   <nav className="navbar navbar-expand-sm navbar-dark bg-dark nav-image bg-nav mb-4 ">
        <div className="container">
          <Link className="navbar-brand  cms  p-1" to="/">
            <span className="text-warning">Ca</span>
            <span className="text-danger">Ma</span>
            <span className="text-success">Sy</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse mobile-nav text-white text-center border">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </div>
          <div className="collapse navbar-collapse mobile-nav text-white text-center border ">
            <Link className="nav-link" to="/student">
              Students
            </Link>
          </div>
          <div className="collapse navbar-collapse mobile-nav text-white text-center border ">
            <Link className="nav-link" to="/block">
              Report
            </Link>
          </div>
          <div className="collapse navbar-collapse mobile-nav text-white text-center border">
            <Link className="nav-link" className="nav-link" to="/staff">
              Management
            </Link>
          </div>
          <div className="collapse navbar-collapse mobile-nav">
            {isAuthenticated ? authLinks : unauthLinks}
          </div>
        </div>
      </nav> */
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
