const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

const validateRoomInput = data => {
  const errors = {};
  const work = ["CLEANING", "REPAIR", "COURSE", "OTHER"];
  const { report, reportee, type } = data;

  data.report = !isEmpty(data.report) ? data.report : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.reportee = !isEmpty(data.reportee) ? data.reportee : "";

  if (Validator.isEmpty(report)) {
    errors.report = "Report description is missing or invalid";
  }

  if (Validator.isEmpty(type) || !work.includes(type)) {
    errors.type = "Select a category";
  }
  if (Validator.isEmpty(reportee)) {
    errors.reportee = "Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateRoomInput
};
