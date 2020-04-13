import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  createStudentDetails,
  getStudentDetails,
} from "../../actions/studentDetailsActions";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { animations } from "react-animation";
import moment from "moment";
import Email from "./Email";

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: this.props.match.params.id,
      name: "",
      email: "",
      id: "",
      gender: "",
      room: "",
      block: "",
      isAvailable: true,
      errors: {},
      openAddStudentModel: false,
      openEmailModel: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    e.preventDefault();
    const studentDetailsData = {
      name: this.state.name,
      email: this.state.email,
      batch: this.state.batch,
      id: this.state.id,
      room: this.state.room,
      block: this.state.block,
      gender: this.state.gender,
    };
    await this.props.createStudentDetails(studentDetailsData);
    this.setState({
      name: "",
      email: "",
      id: "",
      gender: "",
      room: "",
      block: "",
      errors: {},
    });
  }
  async onDelete(id) {
    await axios
      .delete(`/api/student`, { data: { id } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await this.props.getStudentDetails(this.props.match.params.id);
  }
  async onStatusChange(id, isAvailable) {
    await axios
      .put(`/api/student/availability`, { id, isAvailable: !isAvailable })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await this.props.getStudentDetails(this.props.match.params.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.setState({ data: this.props.studentDetails.studentData });
  }
  async componentDidMount() {
    await this.props.getStudentDetails(this.props.match.params.id);
  }

  render() {
    const { studentData, loading } = this.props.studentDetails;
    let tableContent;
    !studentData.length || loading
      ? (tableContent = null)
      : (tableContent = studentData.length
          ? studentData.map((el) => (
              <tr key={el._id} className="student-tr">
                <th scope="row" className="student-th">
                  {studentData.indexOf(el) + 1}
                </th>
                <td className="student-td">
                  <a
                    title="Click for details"
                    href={`/studentdetails/single/${el._id}`}
                  >
                    {el.name ? el.name : "-"}
                  </a>
                </td>
                <td className="student-td">
                  {el.email ? <Email email={el.email} /> : "-"}
                </td>
                <td className="student-td">{el.id ? el.id : "-"}</td>
                <td className="student-td">{el.block ? el.block : "-"}</td>
                <td className="student-td">{el.room ? el.room : "-"}</td>
                <td className="student-td">{el.gender ? el.gender : "-"}</td>
                <td className="student-td">
                  {el.isAvailable ? (
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Click to Mark Absent"
                      onClick={() => {
                        const data = {
                          start: moment().format("YYYY-MM-DD"),
                          name: el.name,
                          studentId: el.id,
                          _id: el._id,
                          title: "Absent",
                          color: "Red",
                        };

                        this.onStatusChange(el._id, el.isAvailable);
                        axios
                          .post("/api/student/attend/addAttendance", data)
                          .then((res) =>
                            console
                              .log(res + "absent marked")
                              .catch((err) =>
                                console.log(err + "err in marking absent")
                              )
                          );
                      }}
                    >
                      Present
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Go to the detailed section to Undo Absent"
                      onClick={() =>
                        this.onStatusChange(el._id, el.isAvailable)
                      }
                    >
                      Absent Marked!
                    </button>
                  )}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  className="student-td text-danger text-center"
                  onClick={() => {
                    Swal.fire({
                      title: `Delete "${el.name}" ?`,
                      text: "You won't be able to revert this!",
                      icon: "error",
                      showCancelButton: true,
                      confirmButtonColor: "green",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.value) {
                        this.onDelete(el.id);
                        Swal.fire({
                          position: "bottom-end",
                          icon: "success",
                          title: `${el.name} has been deleted!`,
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    });
                  }}
                >
                  &times;
                </td>
              </tr>
            ))
          : null);
    const { errors } = this.state;
    return (
      <div className="mid container min-height">
        <h1 className="text-center">{this.state.batch}</h1>
        <button
          className="btn btn-danger mb-3"
          onClick={() =>
            this.setState({
              openAddStudentModel: !this.state.openAddStudentModel,
            })
          }
        >
          Add Student
        </button>
        <a
          href="https://dci-course-planner.herokuapp.com/"
          className="btn btn-primary mb-3 ml-2 text-white"
          target="blank"
        >
          Course Planner
        </a>
        <br />
        <form
          onSubmit={this.onSubmit}
          style={{
            display: this.state.openAddStudentModel ? "" : "none",
            animation: animations.popIn,
          }}
        >
          <div className="row">
            <div className="col-sm">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={classnames("form-control", {
                  "is-invalid": errors.name,
                })}
                onChange={this.onChange}
                name="name"
                value={this.state.name}
              />
              {errors.name && (
                <div className="invalid-tooltip">{errors.name}</div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                className={classnames("form-control", {
                  "is-invalid": errors.email,
                })}
                onChange={this.onChange}
                name="email"
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-tooltip">{errors.email}</div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="id">ID</label>
              <input
                type="number"
                id="id"
                placeholder="ID"
                className={classnames("form-control", {
                  "is-invalid": errors.id,
                })}
                onChange={this.onChange}
                name="id"
                value={this.state.id}
              />
              {errors.id && <div className="invalid-tooltip">{errors.id}</div>}
            </div>
            <div className="col-sm">
              <label htmlFor="block">Block</label>
              <input
                type="text"
                id="block"
                placeholder="Block"
                className={classnames("form-control", {
                  "is-invalid": errors.block,
                })}
                onChange={this.onChange}
                name="block"
                value={this.state.block}
              />
              {errors.block && (
                <div className="invalid-tooltip">{errors.block}</div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="room">Room No.</label>
              <input
                type="text"
                id="room"
                placeholder="Room No."
                className={classnames("form-control", {
                  "is-invalid": errors.room,
                })}
                onChange={this.onChange}
                name="room"
                value={this.state.room}
              />
              {errors.room && (
                <div className="invalid-tooltip">{errors.room}</div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="gen">Gender</label>
              <select
                className={classnames("form-control", {
                  "is-invalid": errors.gender,
                })}
                id="gen"
                onChange={this.onChange}
                value={this.state.gender}
                name="gender"
              >
                {" "}
                <option value="" defaultValue disabled>
                  Select Gender
                </option>
                <option value="FEMALE">FEMALE</option>
                <option value="MALE">MALE</option>
              </select>
              {errors.gender && (
                <div className="invalid-tooltip">{errors.gender}</div>
              )}
            </div>
            <div className="col-auto">
              <button
                type="submit"
                style={{ verticalAlign: "-39px" }}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div style={{ marginTop: "10px" }}>
          {!loading ? (
            <table className="table table-striped student-table ">
              <thead className="thead-light student-thead">
                <tr className="bg-info text-white">
                  <th scope="col" className="student-th">
                    #
                  </th>
                  <th scope="col" className="student-th">
                    Name
                  </th>
                  <th scope="col" className="student-th">
                    Email
                  </th>
                  <th scope="col" className="student-th">
                    ID
                  </th>
                  <th scope="col" className="student-th">
                    Block
                  </th>
                  <th scope="col" className="student-th">
                    Room No.
                  </th>
                  <th scope="col" className="student-th">
                    Gender
                  </th>
                  <th scope="col" className="student-th">
                    Leave Status
                  </th>
                  <th scope="col" className="student-th">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="student-tbody">{tableContent}</tbody>
            </table>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactLoading type="bars" color="#ff3" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

StudentDetails.propTypes = {
  createStudentDetails: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  studentDetails: state.studentDetails,
});

export default connect(mapStateToProps, {
  createStudentDetails,
  getStudentDetails,
})(StudentDetails);
