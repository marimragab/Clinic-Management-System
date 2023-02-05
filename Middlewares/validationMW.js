const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let result = validationResult(request);
  if (!result.isEmpty()) {
    let message = result.errors.reduce((current, object) => {
      return current + object.msg + " ";
    }, "");
    let error = new Error(message);
    error.status = 422;
    next(error);
  } else {
    next();
  }
};
