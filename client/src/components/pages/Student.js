import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import ReactLoading from "react-loading";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findBy: "",
      val: "",
      data: {},
      loading: false,
      errors: {},
      openSearchModel: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFtechDetails = this.onFtechDetails.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onDelete(id) {
    await axios
      .delete(`/api/student`, { data: { id } })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    await this.onFtechDetails();
  }
  async onStatusChange(id, isAvailable) {
    await axios
      .put(`/api/student/availability`, { id, isAvailable: !isAvailable })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    await this.onFtechDetails();
  }
  async onFtechDetails() {
    this.setState({ loading: true });
    if (this.state.findBy === "id") {
      await axios
        .get(`/api/student/id/${this.state.val}`)
        .then(res => {
          this.setState({ data: res, loading: false });
          console.log(res);
          if (!res.data.length) {
            alert("Not Found");
          }
        })
        .catch(err => console.log(err));
    } else if (this.state.findBy === "room") {
      await axios
        .get(`/api/student/room/${this.state.val}`)
        .then(res => {
          this.setState({ data: res, loading: false });
          console.log(res);
          if (!res.data.length) {
            alert("Not Found");
          }
        })
        .catch(err => console.log(err));
    } else if (this.state.findBy === "isAvailable") {
      await axios
        .get(`/api/student/all`)
        .then(res => {
          let tempVal = this.state.val;
          tempVal = tempVal.trim().toLowerCase();
          if (tempVal === "absent") {
            tempVal = false;
          } else if (tempVal === "present") {
            tempVal = true;
          } else {
            this.setState({ loading: false });
            return alert("Input can be 'absent' or 'present' only!");
          }
          const filteredData = res.data
            ? res.data.filter(el => el.isAvailable === tempVal)
            : [];
          const data = {
            data: filteredData
          };
          this.setState({ data: data, loading: false });
          if (!filteredData.length) {
            alert("Not Found");
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ loading: false });
      return alert("Select Room number or Student Id?");
    }
  }
  onBatchSelect(batch) {
    this.props.history.push(`/studentdetails/${batch}`);
  }
  render() {
    const { errors, data, loading } = this.state;
    const courses = [
      { name: "Web Development", id: "FbW7" },
      { name: "Web Development", id: "FbW8" },
      { name: "Online Marketing", id: "FbW9" },
      { name: "Web Development", id: "FbW10" }
    ];
    let tableContent;
    !data
      ? (tableContent = null)
      : (tableContent = data.data
          ? data.data.map(el => (
              <tr key={el._id}>
                <th scope="row">{data.data.indexOf(el) + 1}</th>
                <td>{el.name ? el.name : "-"}</td>
                <td>{el.email ? el.email : "-"}</td>
                <td>{el.id ? el.id : "-"}</td>
                <td>{el.block ? el.block : "-"}</td>
                <td>{el.room ? el.room : "-"}</td>
                <td>{el.gender ? el.gender : "-"}</td>
                <td>
                  {el.isAvailable ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Click to Mark Absent"
                      onClick={() => this.onStatusChange(el.id, el.isAvailable)}
                    >
                      Present
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Click to Mark Present"
                      onClick={() => this.onStatusChange(el.id, el.isAvailable)}
                    >
                      Absent
                    </button>
                  )}
                </td>
                <td
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() =>
                    window.confirm(
                      "Are you sure you wish to delete this student?"
                    ) && this.onDelete(el.id)
                  }
                >
                  &times;
                </td>
              </tr>
            ))
          : null);

    return (
      <div className="mid container min-height d-flex flex-column align-items-center text-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {courses.map(v => (
            <div
              className="card shadow"
              style={{
                width: "12rem",
                margin: "10px",
                backgroundColor: "#ebebe0	",
                color: "black"
              }}
            >
              <div className="card-body">
                <h5 className="card-title h2">{v.id}</h5>
                <h6 className="card-subtitle mb-2 text-dark">{v.name}</h6>
                <button
                  onClick={() => this.onBatchSelect(v.id)}
                  className="card-text btn btn-sm btn-danger atex"
                >
                  Add or Check Info
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <label htmlFor="find" style={{ marginLeft: "14px" }}>
          <button
            className="text-center btn btn-warning shadow"
            onClick={() =>
              this.setState({ openSearchModel: !this.state.openSearchModel })
            }
            style={{ minWidth: "150px" }}
          >
            {this.state.openSearchModel
              ? "Search Students -"
              : "Search Students + "}
          </button>
        </label>
        <div
          className="input-group-prepend"
          style={{
            display: this.state.openSearchModel ? "" : "none",
            width: "500px"
          }}
        >
          <select
            className={classnames("form-control", {
              "is-invalid": errors.room
            })}
            id="find"
            onChange={this.onChange}
            value={this.state.findBy}
            name="findBy"
          >
            {" "}
            <option value="" defaultValue disabled>
              Select
            </option>
            <option value="id">Student Id</option>
            <option value="room">Room No.</option>
            <option value="isAvailable">Absent/Present</option>
          </select>
          <input
            type="text"
            id="val"
            placeholder="Search here..."
            className={classnames("form-control", {
              "is-invalid": errors.room
            })}
            onChange={this.onChange}
            name="val"
            value={this.state.val}
            required={true}
          />
          {errors.room && <div className="invalid-tooltip">{errors.room}</div>}
          <button
            className="btn btn-primary ml-1"
            style={{ fontSize: "1px" }}
            onClick={this.onFtechDetails}
          >
            <i class="material-icons">search</i>
          </button>
        </div>
        <div
          style={{
            marginTop: "50px",
            overflow: "hidden",
            maxHeight: 800,
            width: "100%",
            display: this.state.openSearchModel ? "" : "none"
          }}
        >
          {!loading ? (
            tableContent ? (
              <table className="table table-striped table-hover">
                <thead className="bg-info">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">ID</th>
                    <th scope="col">Block</th>
                    <th scope="col">Room No.</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Leave Status</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{tableContent}</tbody>
              </table>
            ) : (
              <p
                className="text-secondary tracking-in-contract-bck 
              "
              >
                Search and catch a student red handed...<span>😉</span>
              </p>
            )
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

export default Student;
