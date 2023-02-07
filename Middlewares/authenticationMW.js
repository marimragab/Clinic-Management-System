const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    request.id = decodedToken.id;
    request.role = decodedToken.role;
  } catch (error) {
    error.status = 403;
    error.message = "Not Authorized";
    next(error);
  }
  next();
};

module.exports.isEmployee = (request, response, next) => {
  if (request.role == "employee") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isPatient = (request, response, next) => {
  if (request.role == "patient") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isDoctor = (request, response, next) => {
  if (request.role == "doctor") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isDoctorOrPatient = (request, response, next) => {
  if (request.role == "doctor" || request.role == "patient") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
