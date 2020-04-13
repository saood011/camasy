const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Create Schema
const RoomSchema = new Schema({
  block: { type: String, required: true },
  report: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["CLEANING", "REPAIR", "COURSE", "OTHER"],
    required: true
  },
  reportee: {
    type: String,
    trim: true
  },
  time: {
    type: Date,
    default: moment().format()
  }
});

module.exports = Room = mongoose.model("room", RoomSchema);
