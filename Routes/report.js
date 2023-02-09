const express = require("express");

const {getInvoicesAtSpecificPeriod,getInvoicesAtSpecificDay} = require("../Controllers/report");

const validator = require("./../Middlewares/validationMW");

// const {} = require("./../Validations/report");

const {
  isDoctor,
  isPatient,
  isDoctorOrPatient,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

//Get all invoices at specific period
router.get("/report/invoices",getInvoicesAtSpecificPeriod)

//Get all invoices at specific day to calculate the total of that day and the services served at that day
router.get("/report/invoices/:day",getInvoicesAtSpecificDay)
module.exports = router;
