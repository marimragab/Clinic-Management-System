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

const router = express.Router();

router
  .route("/doctor")
  .get(getAllDoctors)
  .post(addDoctorValidations, validator, addNewDoctor)
  .patch(updateDoctorValidations, validator, updateDoctor)
  .delete(deleteDoctorValidations, validator, deleteDoctor);

module.exports = router;
