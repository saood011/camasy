import React, { Component } from "react";
/* import { Link } from "react-router-dom";
 */ import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner text-light">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12 text-center">
                <h1 className="display-4 ">
                  <span className="font-weight-bold text-warning">Ca</span>mpus{" "}
                  <span className="font-weight-bold text-danger">Ma</span>
                  nagement{" "}
                  <span className="font-weight-bold text-success">Sy</span>
                  stem
                </h1>

                <div className="d-flex justify-content-center">
                  <h1 className="border p-2 mt-5">
                    <span className="font-weight-bold text-warning">Ca</span>
                    <span className="font-weight-bold text-danger">Ma</span>
                    <span className="font-weight-bold text-success">Sy</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
