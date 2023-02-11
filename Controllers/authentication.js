const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./../Models/employee");
const Employee = mongoose.model("employees");
require("./../Models/patient");
const Patient = mongoose.model("patients");
const Doctor = require("./../Models/doctor");


//! Enhance this login later (adding a new collection for all users on our system)
const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const employee = await Employee.findOne({ email });
    console.log("employee", employee);
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    console.log(employee);
    if (employee && (await bcrypt.compare(password, employee.password))) {
      const token = generateToken(employee._id, employee.roll);
      response.status(200).json({
        employeeId: employee._id,
        role:employee.roll,
        token,
      });
    } else if (patient && (await bcrypt.compare(password, patient.password))) {
      const token = generateToken(patient._id, "patient");
      response.status(200).json({
        patientId: patient._id,
        role:"patient",
        token,
      });
    } else if (doctor && (await bcrypt.compare(password, doctor.password))) {
      const token = generateToken(doctor._id, "doctor");
      response.status(200).json({
        doctorId: doctor._id,
        role:"doctor",
        token,
      });
    } else {
      let error = new Error("Not Authenticated ");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};


function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
}

module.exports = {
  login,
};
