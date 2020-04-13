import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createRoomAction, getRoomAction } from "../../actions/roomActions";
import axios from "axios";
import ReactLoading from "react-loading";
import moment from "moment";

class RoomAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: this.props.match.params.id,
      report: "",
      type: "",
      reportee: "",
      time: new Date(),
      errors: {},
      openAddReport: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onDelete(_id) {
    await axios
      .delete(`/api/room/${_id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    await this.props.getRoomAction(this.props.match.params.id);
  }
  async onSubmit(e) {
    e.preventDefault();
    console.log(this.props.match.params.id);
    const activityRecord = {
      block: this.state.block,
      report: this.state.report,
      type: this.state.type,
      reportee: this.state.reportee,
      time: this.state.time
    };
    console.table(activityRecord);
    await this.props.createRoomAction(activityRecord);
    this.setState({
      report: "",
      reportee: "",
      type: "",
      errors: {}
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  async componentDidMount() {
    await this.props.getRoomAction(this.props.match.params.id);
  }
  render() {
    const { roomData, loading } = this.props.roomData;
    let tableContent;
    !roomData.length || loading
      ? (tableContent = null)
      : (tableContent = roomData.length
          ? roomData.map(el => (
              <tr key={el._id} className="report-tr">
                <th scope="row" className="report-th text-center">
                  {roomData.indexOf(el) + 1}
                </th>
                <td className="report-td">{el.report ? el.report : "-"}</td>

                <td className="report-td">{el.type ? el.type : "-"}</td>
                <td className="report-td">
                  {el.time ? moment(el.time).format("LLL") : "-"}
                </td>
                <td className="report-td">{el.reportee ? el.reportee : "-"}</td>

                <td
                  style={{
                    cursor: "pointer",
                    color: "red",
                    textAlign: "center"
                  }}
                  className="report-td"
                  onClick={() => this.onDelete(el._id)}
                >
                  &times;
                </td>
              </tr>
            ))
          : null);
    const { errors } = this.state;
    return (
      <div className="mid container min-height">
        <h1 className="bg-warning mt-1 p-1 text-center rounded">
          {this.state.block}
        </h1>
        <br />
        <button
          className="btn btn-warning mb-3"
          onClick={() =>
            this.setState({ openAddReport: !this.state.openAddReport })
          }
        >
          Add Feedback/ Report
        </button>
        {this.state.openAddReport ? (
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="report">Report/ Feedback</label>
                <textarea
                  type="text"
                  id="id"
                  placeholder="Type here..."
                  className={classnames("form-control", {
                    "is-invalid": errors.report
                  })}
                  onChange={this.onChange}
                  name="report"
                  value={this.state.report}
                />
                {errors.report && (
                  <div className="invalid-tooltip">{errors.report}</div>
                )}
              </div>

              <div className="col">
                <label htmlFor="ex2">Report type</label>
                <select
                  className={classnames("form-control", {
                    "is-invalid": errors.type
                  })}
                  id="ex2"
                  onChange={this.onChange}
                  value={this.state.type}
                  name="type"
                >
                  {" "}
                  <option value="" defaultValue disabled>
                    Select
                  </option>
                  <option value="COURSE">Course related</option>
                  <option value="REPAIR">Repair</option>
                  <option value="CLEANING">Cleaning</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.type && (
                  <div className="invalid-tooltip">{errors.type}</div>
                )}
              </div>

              <div className="col">
                <label htmlFor="reportee">Reported by</label>
                <input
                  type="text"
                  id="reportee"
                  placeholder="Your Name"
                  className={classnames("form-control", {
                    "is-invalid": errors.reportee
                  })}
                  onChange={this.onChange}
                  name="reportee"
                  value={this.state.reportee}
                />
                {errors.reportee && (
                  <div className="invalid-tooltip">{errors.reportee}</div>
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
        ) : null}

        <div style={{ marginTop: "10px", overflow: "hidden", maxHeight: 800 }}>
          {!loading ? (
            <table className="table table-sm table-striped table-hover report-table">
              <thead className="thead-light report-thead">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Report</th>
                  <th scope="col">Report Type</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Reported by</th>
                  <th scope="col">Delete?</th>
                </tr>
              </thead>
              <tbody className="report-tbody">{tableContent}</tbody>
            </table>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactLoading type="bars" color="#ff2" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

RoomAction.propTypes = {
  createRoomAction: PropTypes.func.isRequired,
  getRoomAction: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  roomData: state.roomData
});
export default connect(mapStateToProps, { createRoomAction, getRoomAction })(
  RoomAction
);
