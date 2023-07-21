const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
