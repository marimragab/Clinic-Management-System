const express = require("express");
const controller = require("./../Controllers/patient");
const validator = require("./../Middlewares/validationMW");
const {addPatientValidation,updatePatientValidation,deletePatientValidation} = require("./../Validations/patient");
const router = express.Router();

const {
    isReceptionistOrAccountantOrAdmin, isReceptionistOrPatient,
  } = require("./../Middlewares/authenticationMW");

router.route("/patient")
.get(isReceptionistOrAccountantOrAdmin,controller.getAllPatients)
.post(addPatientValidation,validator,isReceptionistOrPatient,controller.addPatient)
.patch(updatePatientValidation,validator,isReceptionistOrPatient,controller.updatePatient)
.delete(deletePatientValidation,validator,isReceptionistOrPatient,controller.deletaPatient)

module.exports = router;