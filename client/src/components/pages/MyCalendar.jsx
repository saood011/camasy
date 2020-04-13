import React from "react";
import { connect } from "react-redux";
import { getSingleStudentDetails } from "../../actions/studentDetailsActions";
import Axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import Swal from "sweetalert2";

// must manually import the stylesheets for each plugin
import "../../../node_modules/@fullcalendar/core/main.css";
import "../../../node_modules/@fullcalendar/daygrid/main.css";
import "../../../node_modules/@fullcalendar/timegrid/main.css";

class MyCalendar extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarWeekends: true,
    isAvailablehere: false,
  };

  async componentWillMount() {
    await this.props.getSingleStudentDetails(this.props.id);
    console.log("willmount");
  }
  //to re-render after every new attendance
  componentDidUpdate(prevProps) {
    //  comparing props:
    if (this.props.render !== prevProps.render) {
      this.props.getSingleStudentDetails(this.props.id);
    }
  }
  sendEmail = (date) => {
    console.log(this.props.studentDetails[0].email);
    axios
      .post("/api/student/sendemail", {
        Email: this.props.studentDetails[0].email,
        subject: "Automated response from CaMaSy",
        message: `Dear ${this.props.studentDetails[0].name}, \n \n You are marked absent for ${date}! If you are present this day, please contact your teacher. \n \n CaMaSy - by Saood`,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire("Student Notified!");
      });
  };

  render() {
    console.log("render");
    return (
      <div className="container-calendar ">
        <div className="app-calendar fc-height shadow">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right:
                "dayGridMonth,timeGridWeek,timeGridDay,listWeek, timeGridFourDay",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={
              this.props.studentDetails[0] &&
              this.props.studentDetails[0].attendances
            }
            views={{
              timeGridFourDay: {
                type: "timeGrid",
                duration: { days: 4 },
                buttonText: "4 day",
              },
            }}
            height="parent"
            padding="150px"
            dateClick={(info) =>
              Swal.fire({
                title: "Do you want to mark absent on " + info.dateStr + "?",
                text: "You can delete an event by clicking on it!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "red",
                confirmButtonText: "Yes, Absent!",
              }).then((result) => {
                if (result.value) {
                  this.props.onDateClickHandler({
                    start: info.dateStr,
                    _id: this.props.id,
                  });
                  this.sendEmail(info.dateStr);
                }
              })
            }
            selectable={true}
            eventClick={(info) => {
              /*   this.handleEventClick(
                this.props.id,
                this.props.studentDetails[0].isAvailable
              ); */
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.value) {
                  this.deleteEvent(info.event._def.extendedProps._id); //fire delete route here
                  Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
                }
              });
            }}
          />
        </div>
        <div className="demo-app-top d-flex justify-content-between">
          <button
            onClick={this.toggleWeekends}
            className="btn btn-dark mb-2 w-50"
          >
            {!this.state.calendarWeekends ? "Show Weekends" : "Hide Weekends"}
          </button>
          &nbsp;
          <button className="btn btn-dark mb-2 w-50" onClick={this.gotoPast}>
            Go to a date
          </button>
        </div>
      </div>
    );
  }

  //Show OR hide weekends
  toggleWeekends = () => {
    this.setState({
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  // Go to a given date in calendar
  gotoPast = () => {
    Swal.fire({
      title: "Format - YYYY-MM-DD",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        placeholder: "YYYY-MM-DD",
      },
      showCancelButton: true,
      confirmButtonText: "Go!",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value) {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate(result.value);
      }
    });
  };

  // Delete event
  deleteEvent = (id) => {
    console.log(id);
    Axios.delete("/api/student/attend/addAttendance/delete", { data: { id } });
    this.props.getSingleStudentDetails(this.props.id);
    console.log(this.props.id);
  };

  // Toggle availability
  /*   handleEventClick = id => {
    console.log(id);
      axios 
      .put(`/api/student/availability`, {
        id,
        isAvailable: !isAvailable
      })
      .then(res => this.setState({ isAvailablehere: true }))
      .catch(err => console.log(err));
    this.props.getSingleStudentDetails(id); 
  }; */
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  studentDetails: state.studentDetails.studentData,
});

export default connect(mapStateToProps, {
  getSingleStudentDetails,
})(MyCalendar);
