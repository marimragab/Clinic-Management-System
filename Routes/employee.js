const express = require("express");
const controller = require("./../Controllers/employee");
const validation = require("./../Validations/employee");
const { body, query, param, validationResult } = require("express-validator");
const validator = require("./../Middlewares/validationMW");
const router = express.Router();

const { isAdmin } = require("./../Middlewares/authenticationMW");

router
  .route("/Employee")
  .all(isAdmin)
  .get(controller.getAllEmployees)
  .post(validation.postValidation, validator, controller.addEmployee)
  .patch(validation.patchValidation, controller.updateEmployee)
  .delete([body("_id").isInt()], controller.deleteEmployee);

module.exports = router;
