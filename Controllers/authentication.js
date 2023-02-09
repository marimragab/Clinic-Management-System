const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./../Models/employee");
const Employee = mongoose.model("employees");
require("./../Models/patient");
const Patient = mongoose.model("patients");
const Doctor = require("./../Models/doctor");

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const employee = await Employee.findOne({ email });
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (employee ) {
      const token = generateToken(employee._id, employee.roll);
      response.status(200).json({
        employeeId: employee._id,
        token,
      });
    } else if (patient && (await bcrypt.compare(password, patient.password))) {
      const token = generateToken(patient._id, "patient");
      response.status(200).json({
        patientId: patient._id,
        token,
      });
    } else if (doctor && (await bcrypt.compare(password, doctor.password))) {
      const token = generateToken(doctor._id, "doctor");
      response.status(200).json({
        doctorId: doctor._id,
        token,
      });
    } else {
      // let error = new Error("Not Authenticated ");
      // error.status = 401;
      // next(error);
      next()
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
