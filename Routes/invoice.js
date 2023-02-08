const express = require("express");

const {
  getAllInvoices,
  addNewInvoice,
  updateInvoice,
} = require("../Controllers/invoice");

const validator = require("./../Middlewares/validationMW");

const {
  addInvoiceValidations,
  updateInvoiceValidations,
  deleteInvoiceValidations,
} = require("./../Validations/invoice");

const {
  isDoctor,
  isPatient,
  isDoctorOrPatient,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

router
  .route("/invoice")
  .get(getAllInvoices)
  .post(addInvoiceValidations, validator, addNewInvoice)
  .patch(updateInvoiceValidations, validator, updateInvoice);

module.exports = router;
