const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

const validateInventoryInput = data => {
  const errors = {};
  const categories = [
    "Electronics",
    "Computers",
    "Furniture",
    "Stationary",
    "Other"
  ];
  const { item, quantity, category } = data;

  data.item = !isEmpty(data.item) ? data.item : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.category = !isEmpty(data.category) ? data.category : "";

  if (Validator.isEmpty(item)) {
    errors.report = "Item description is missing or invalid";
  }

  if (Validator.isEmpty(quantity)) {
    errors.quantity = "Quantity? ";
  }
  if (Validator.isEmpty(category) || !categories.includes(category)) {
    errors.category = "Select a category";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateInventoryInput
};
