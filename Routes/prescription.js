const express = require("express");
const {
  getAllPrescriptions,
  addNewPrescription,
  updatePrescription,
  deletePrescription,
} = require("../Controllers/appointment");
const validator = require("./../Middlewares/validationMW");
const {
  addPrescriptionValidations,
  updatePrescriptionValidations,
  deletePrescriptionValidations,
} = require("./../Validations/appointment");

const router = express.Router();

router
  .route("/appointment")
  .get(getAllAppointments)
  .post(addAppointmentValidations, validator, addNewAppointment)
  .patch(updateAppointmentValidations, validator, updateAppointment)
  .delete(deleteAppointmentValidations, validator, deleteAppointment);

module.exports = router;
