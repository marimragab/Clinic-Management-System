const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Employee = require("./../Models/employee");
const Patient = require("./../Models/patient");
const Doctor = require("./../Models/doctor");

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const employee = await Employee.findOne({ email });
    if (employee && (await bcrypt.compare(password, employee.password))) {
      const token = generateToken(employee._id, "employee");
      response.status(200).json({
        employeeId: employee._id,
        token,
      });
    } else {
      const patient = await Patient.findOne({ email });
      if (patient && (await bcrypt.compare(password, patient.password))) {
        const token = generateToken(patient._id, "patient");
        response.status(200).json({
          patientId: patient._id,
          token,
        });
      } else {
        const doctor = await Doctor.findOne({ email });
        if (doctor && (await bcrypt.compare(password, doctor.password))) {
          const token = generateToken(doctor._id, "doctor");
          response.status(200).json({
            doctorId: doctor._id,
            token,
          });
        } else {
          let error = new Error("Not Authenticated ");
          error.status = 401;
          next(error);
        }
      }
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
