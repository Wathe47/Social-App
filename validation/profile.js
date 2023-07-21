const Validator = require("validator");
const isEmpty = require("./is-empty");

function validateProfileInput(data) {
  let errors = {};

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40";
  }

  if (isEmpty(data.status)) {
    errors.status = "status must not be empty";
  }
  if (isEmpty(data.skills)) {
    errors.skills = "Skills must not be empty";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validateExperienceInput(data) {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "Title is required";
  }
  if (isEmpty(data.company)) {
    errors.company = "company is required";
  }
  if (isEmpty(data.from)) {
    errors.from = "from is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validateEducationInput(data) {
  const errors = {};
  if (isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (isEmpty(data.degree)) {
    errors.degree = "degree is required";
  }

  if (isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy is required";
  }

  if (isEmpty(data.from)) {
    errors.from = "from is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validateExperienceInput,
  validateProfileInput,
  validateEducationInput,
};
