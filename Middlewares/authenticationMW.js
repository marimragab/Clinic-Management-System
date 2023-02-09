const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    request.id = decodedToken.id;
    request.role = decodedToken.role;
  } catch (error) {
    error.status = 403;
    error.message = "Not Authorized";
    next(error);
  }
  next();
};

module.exports.isReceptionist = (request, response, next) => {
  if (request.role == "receptionist") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdmin = (request, response, next) => {
  if (request.role == "Admin") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isAccountant = (request, response, next) => {
  if (request.role == "Accountant") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isPharmaceutical = (request, response, next) => {
  if (request.role == "pharmaceutical") {
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

module.exports.isReceptionistOrDoctorOrNurse = (request, response, next) => {
  if (
    request.role == "doctor" ||
    request.role == "receptionist" ||
    request.role == "nurse"
  ) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isReceptionistOrPatient = (request, response, next) => {
  if (request.role == "patient" || request.role == "receptionist") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isReceptionistOrAccountantOrAdmin = (
  request,
  response,
  next
) => {
  if (
    request.role == "receptionist" ||
    request.role == "Accountant" ||
    request.role == "Admin"
  ) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isReceptionistOrPatientOrAccountantOrAdmin = (
  request,
  response,
  next
) => {
  if (
    request.role == "patient" ||
    request.role == "receptionist" ||
    request.role == "Accountant" ||
    request.role == "Admin"
  ) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
