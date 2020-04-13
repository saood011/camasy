const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attendance = require("./Attendance");

// Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true
  },
  room: {
    type: String
  },
  block: {
    type: String,
    enum: ["A", "B", "C", "D"],
    trim: true,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  attendances: [{ type: Schema.Types.ObjectId, ref: "Attendance" }],
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    required: true
  }
});

module.exports = Student = mongoose.model("Student", StudentSchema, "students");
