const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

//per day attendance schema

var AttendanceSchema = Schema({
  name: { type: String },
  studentId: { type: String },
  title: { type: String, default: "Absent" },
  start: {
    type: String,
    default: moment().format()
  },
  end: { type: String },
  color: { type: String, default: "red" },
  allDay: { type: Boolean, default: true }
});
module.exports = Attendance = mongoose.model("Attendance", AttendanceSchema);
