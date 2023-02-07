const express = require("express");
const {
  getAllDoctotrs,
  addNewDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../Controller/doctor");
const validator = require("./../Middlewares/validationMW");
const {
  addDoctorValidations,
  updateDoctorValidations,
  deleteDoctorValidations,
} = require("./../Validations/doctor");

const router = express.Router();

router
  .route("/doctor")
  .get(getAllDoctors)
  .post(addDoctorValidations, validator, addNewDoctor)
  .patch(updateDoctorValidations, validator, updateDoctor)
  .delete(deleteDoctorValidations, validator, deleteDoctor);

module.exports = router;
