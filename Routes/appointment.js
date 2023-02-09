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
  isReceptionist,
  isReceptionistOrPatient,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

router
  .route("/appointment")
  .get(isReceptionist,getAllAppointments)
  .post(addAppointmentValidations, validator,isReceptionistOrPatient, addNewAppointment)
  .patch(updateAppointmentValidations, validator,isReceptionistOrPatient, updateAppointment)
  .delete(deleteAppointmentValidations, validator,isReceptionistOrPatient ,deleteAppointment);


module.exports = router;
