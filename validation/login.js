const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";

  if (validator.isEmpty(data.email)) {
    errors.email = "email must not be empty";
  }

  if (!Validator.isEmail(data.name)) {
    errors.name = "Email is not Valid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
