const express = require("express");
const {
  getAllAppointments,
  addNewAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../Controllers/appointment");
const validator = require("./../Middlewares/validationMW");
const {
  addAppointmentValidations,
  updateAppointmentValidations,
  deleteAppointmentValidations,
} = require("./../Validations/appointment");
const {
  isDoctor,
  isPatient,
  isDoctorOrPatient,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

router
  .route("/appointment")
  .get(getAllAppointments)
  .post(addAppointmentValidations, validator, isPatient, addNewAppointment)
  .patch(updateAppointmentValidations, validator, updateAppointment)
  .delete(deleteAppointmentValidations, validator, deleteAppointment);

module.exports = router;
