const express = require("express");
const {
  getAllAppointments,
  getSpecificDoctorAppointmentsOnDay,
  getAllAppointmentsOnSpecificDay,
  addNewAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../Controllers/appointment");
const validator = require("./../Middlewares/validationMW");
const {
  addAppointmentValidations,
  updateAppointmentValidations,
  deleteAppointmentValidations,
  getDoctorAppointmentsOnDayValidations,
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
  .post(addAppointmentValidations, validator, addNewAppointment)
  .patch(updateAppointmentValidations, validator, updateAppointment)
  .delete(deleteAppointmentValidations, validator, deleteAppointment);

router
  .route("/appointment/:doctor/:day")
  .get(
    getDoctorAppointmentsOnDayValidations,
    validator,
    getSpecificDoctorAppointmentsOnDay
  );

router.get("/appointment/day", getAllAppointmentsOnSpecificDay);
module.exports = router;
