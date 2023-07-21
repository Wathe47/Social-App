const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Name must not be empty";
  } else {
    data.name = data.name;
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (isEmpty(data.email)) {
    errors.email = "email must not be empty";
  } else {
    data.email = data.email;
  }

  if (!Validator.isEmail(data.email)) {
    errors.name = "Email is not Valid";
  }

  if (isEmpty(data.password)) {
    errors.password = "password must not be empty";
  } else {
    data.password = data.password;
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "password must be between 2 and 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords shoud match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
