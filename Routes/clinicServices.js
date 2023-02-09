const express = require("express");
const controller = require("./../Controllers/clinicServices");
const validation = require("./../Validations/clinicServices");
const { body, query, param, validationResult } = require("express-validator");
const validator = require("./../Middlewares/validationMW");
const router = express.Router();

const {
  isReceptionistOrPatientOrAccountantOrAdmin,
  isAdmin,
} = require("./../Middlewares/authenticationMW");

router
  .route("/Services")
  .get(isReceptionistOrPatientOrAccountantOrAdmin, controller.getAllServices)
  .post(validation.postValidation, validator, isAdmin, controller.addServices)
  .patch(validation.patchValidation, isAdmin, controller.updateServices)
  .delete([body("_id").isInt()], isAdmin, controller.deleteServices);

module.exports = router;
