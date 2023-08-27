const isEmpty = require("./is-empty");
const Validator = require("validator");

function validatePostInput(data) {
  const errors = {};
  if (isEmpty(data.text)) {
    errors.text = "text can't be empty";
  }

  if (!Validator.isLength(data.text)) {
    errors.text = "Text must have between 1 and 300 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validatePostInput;
