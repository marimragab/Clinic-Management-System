const express = require("express");

const {
  getAllInvoices,
  addNewInvoice,
  updateInvoice,
  deleteInvoice,
  getSpecificInvoice
} = require("../Controllers/invoice");

const validator = require("./../Middlewares/validationMW");

const {
  addInvoiceValidations,
  updateInvoiceValidations,
  idParamInvoiceValidations 
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

router
  .route("/invoice/:id")
  .get( idParamInvoiceValidations ,validator,getSpecificInvoice)
  .delete( idParamInvoiceValidations , validator, deleteInvoice);
module.exports = router;
