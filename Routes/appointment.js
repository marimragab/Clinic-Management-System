const express = require("express");
const {
  getAllAppointments,
  addNewAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./../Controller/appointment");
const validator = require("./../Middlewares/validationMW");
const {
  addAppointmentValidations,
  updateAppointmentValidations,
  deleteAppointmentValidations,
} = require("./../Validations/appointment");

const router = express.Router();

router
  .route("/appointment")
  .get(getAllAppointments)
  .post(addAppointmentValidations, validator, addNewAppointment)
  .patch(updateAppointmentValidations, validator, updateAppointment)
  .delete(deleteAppointmentValidations, validator, deleteAppointment);

module.exports = router;
