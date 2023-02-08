const express = require("express");
const controller = require("./../Controllers/patient");
const validator = require("./../Middlewares/validationMW");
const {addPatientValidation,updatePatientValidation,deletePatientValidation} = require("./../Validations/patient");
const router = express.Router();

router.route("/patient")
.get(controller.getAllPatients)
.post(addPatientValidation,validator,controller.addPatient)
.patch(updatePatientValidation,validator,controller.updatePatient)
.delete(deletePatientValidation,validator,controller.deletaPatient)

module.exports = router;