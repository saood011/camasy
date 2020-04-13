import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleStudentDetails } from "../../actions/studentDetailsActions";
import Reactloading from "react-loading";
import MyCalendar from "./MyCalendar";
import Axios from "axios";
import Chart from "./Chart";
import Swal from "sweetalert2";
import moment from "moment";
class SingleStudent extends Component {
  state = {
    start: moment().format("YYYY-MM-DD"),
    name: "",
    title: undefined, //default value to be taken from model schema
    studentId: "",
    end: moment().format("YYYY-MM-DD"),
    color: "red",
    renderCalender: false,
    otherEvent: false
  };
  componentDidMount() {
    this.props.getSingleStudentDetails(this.props.match.params.id);
  }

  onButtonClick = data => {
    if (data.start) {
      Axios.post("/api/student/attend/addAttendance", data);
      this.props.getSingleStudentDetails(data._id); // "this.props.match.param.id" and "data._id" are same
      this.setState({ renderCalender: !this.state.renderCalender }); //re-rendering Mycalendar to show new attendance
    } else {
      Swal.fire(
        "Event is not saved! Please try again and select a start date."
      );
    }
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="fluid-container">
        <div className="row m-0">
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            {this.props.studentDetails.loading ? (
              <Reactloading type="bubbles" color="red" />
            ) : (
              <div className=" d-flex justify-content-center mt-2">
                {this.props.studentDetails.studentData.map(v => (
                  <div className="d-flex flex-wrap justify-content-center">
                    <p className="bg-light shadow d-flex justify-content align-items-center p-2 ">
                      Name<i class="material-icons">play_arrow</i>
                    </p>
                    <p className=" bg-light mr-2 d-flex justify-content-center align-items-center p-2 font-weight-bolder">
                      {v.name}
                    </p>
                    <p className="bg-light shadow d-flex justify-content-center align-items-center p-2">
                      Email <i class="material-icons">play_arrow</i>
                    </p>
                    <p className="bg-light mr-2 d-flex justify-content-center align-items-center p-2">
                      {v.email}
                    </p>
                    <p className="bg-light shadow d-flex justify-content-center align-items-center p-2">
                      Batch <i class="material-icons">play_arrow</i>
                    </p>
                    <p className=" bg-light mr-2 d-flex justify-content-center align-items-center p-2">
                      {v.batch}
                    </p>
                    <p className="bg-light shadow d-flex justify-content-center align-items-center p-2">
                      Room No <i class="material-icons">play_arrow</i>
                    </p>
                    <p className="text-left mr-2 bg-light d-flex justify-content-center align-items-center pr-3 pl-3 ">
                      {v.room}
                    </p>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-dark ml-2 shadow"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        Enter an event
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                className="modal-title text-dark w-100 text-center"
                                id="exampleModalLongTitle"
                              >
                                {v.name}
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="row">
                                  <div class="col-6">
                                    <small
                                      id="passwordHelpBlock"
                                      className="form-text text-muted text-left pl-1"
                                    >
                                      Select a start date:
                                      <span className="text-danger">*</span>
                                    </small>

                                    <input
                                      type="date"
                                      class="form-control"
                                      placeholder="Select the date"
                                      name="start"
                                      value={this.state.start}
                                      onChange={this.onChangeHandler}
                                      onBlur={() =>
                                        this.setState({ end: this.state.start })
                                      }
                                    />
                                  </div>
                                  <div class="col-6">
                                    <small
                                      id="passwordHelpBlock"
                                      className="form-text text-muted text-left pl-1"
                                    >
                                      Select a end date:
                                    </small>
                                    <input
                                      type="date"
                                      class="form-control"
                                      placeholder="Select the date"
                                      name="end"
                                      onChange={this.onChangeHandler}
                                      value={this.state.end}
                                    />
                                  </div>
                                  <div class="col-sm-12 d-flex justify-content-around">
                                    <small
                                      id="passwordHelpBlock"
                                      className="form-text text-muted text-left pl-1"
                                    >
                                      Select an event:
                                    </small>
                                    <input
                                      type="button"
                                      className="btn btn-danger btn-sm mt-3"
                                      value="Absent"
                                      onClick={() =>
                                        this.setState({
                                          color: "red",
                                          title: "absent"
                                        })
                                      }
                                    />
                                    <input
                                      type="button"
                                      className="btn btn-primary btn-sm mt-3"
                                      value="Came late"
                                      onClick={() =>
                                        this.setState({
                                          color: "blue",
                                          title: "came late"
                                        })
                                      }
                                    />
                                    <input
                                      type="button"
                                      className="btn btn-warning btn-sm mt-3"
                                      value="Left early"
                                      onClick={() =>
                                        this.setState({
                                          color: "yellow",
                                          title: "left early"
                                        })
                                      }
                                    />
                                    <input
                                      type="button"
                                      value="Other"
                                      name="title"
                                      className="btn btn-sm btn-dark mt-3"
                                      onChange={this.onChangeHandler}
                                      onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                          otherEvent: !this.state.otherEvent
                                        });
                                      }}
                                    />
                                  </div>

                                  {this.state.otherEvent ? (
                                    <div className="col-sm-12 d-flex mt-3">
                                      <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter a event title here..."
                                        name="title"
                                        onChange={this.onChangeHandler}
                                      />

                                      <input
                                        type="color"
                                        name="color"
                                        value={this.state.color}
                                        onChange={this.onChangeHandler}
                                        className="form-control form-control"
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                onClick={() =>
                                  this.onButtonClick({
                                    start: this.state.start,
                                    name: v.name,
                                    studentId: v.id,
                                    _id: v._id,
                                    title: this.state.title,
                                    end: this.state.end,
                                    color: this.state.color
                                  })
                                }
                                data-dismiss="modal"
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-7  pl-2 pr-2 ">
            <MyCalendar
              id={this.props.match.params.id}
              render={this.state.renderCalender}
              onDateClickHandler={this.onButtonClick}
            />
          </div>
          <div className="col-lg-5">
            <Chart data={this.props.studentDetails.studentData[0]} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  studentDetails: state.studentDetails
});

export default connect(mapStateToProps, { getSingleStudentDetails })(
  SingleStudent
);
