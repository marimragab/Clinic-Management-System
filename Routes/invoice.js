const express = require("express");

const {
  getAllInvoices,
  addNewInvoice,
  updateInvoice,
  deleteInvoice,
  getSpecificInvoice,
} = require("../Controllers/invoice");

const validator = require("./../Middlewares/validationMW");

const {
  addInvoiceValidations,
  updateInvoiceValidations,
  idParamInvoiceValidations,
} = require("./../Validations/invoice");

const {
  isAccountant,
  isReceptionistOrPatientOrAccountantOrAdmin,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

router
  .route("/invoice")
  .all(isAccountant)
  .get(getAllInvoices)
  .post(addInvoiceValidations, validator, addNewInvoice)
  .patch(updateInvoiceValidations, validator, updateInvoice);

router
  .route("/invoice/:id")
  .get(
    idParamInvoiceValidations,
    isReceptionistOrPatientOrAccountantOrAdmin,
    validator,
    getSpecificInvoice
  )
  .delete(idParamInvoiceValidations, validator, isAccountant, deleteInvoice);
module.exports = router;
