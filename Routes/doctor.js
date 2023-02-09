const express = require("express");
const {
  getAllDoctors,
  addNewDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../Controllers/doctor");
const validator = require("./../Middlewares/validationMW");
const {
  addDoctorValidations,
  updateDoctorValidations,
  deleteDoctorValidations,
} = require("./../Validations/doctor");

const {
  isAdmin,
  isReceptionistOrAccountantOrAdmin,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

router
  .route("/doctor")
  .get(isReceptionistOrAccountantOrAdmin, getAllDoctors)
  .post(addDoctorValidations, validator, isAdmin, addNewDoctor)
  .patch(updateDoctorValidations, validator, isAdmin, updateDoctor)
  .delete(deleteDoctorValidations, validator, isAdmin, deleteDoctor);

module.exports = router;
