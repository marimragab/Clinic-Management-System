const express = require("express");

const {
  getInvoicesAtSpecificPeriod,
  getInvoicesAtSpecificDay,
  getAllAppointmentsOnSpecificDay,
  getSpecificDoctorAppointmentsOnDay
} = require("../Controllers/report");

const validator = require("./../Middlewares/validationMW");


const {
  getDoctorAppointmentsOnDayValidations,
} = require("./../Validations/appointment");

const {
  isAccountant,
  isReceptionistOrDoctorOrNurse,
  isReceptionist,
} = require("./../Middlewares/authenticationMW");

const router = express.Router();

//Get all invoices at specific period
router.get("/report/invoices", isAccountant, getInvoicesAtSpecificPeriod);

//Get all invoices at specific day to calculate the total of that day and the services served at that day
router.get("/report/invoices/:day", isAccountant, getInvoicesAtSpecificDay);

router
  .route("/report/appointment/:doctor/:day")
  .get(
    getDoctorAppointmentsOnDayValidations,
    validator,
    isReceptionistOrDoctorOrNurse,
    getSpecificDoctorAppointmentsOnDay
  );

router.get("/report/appointment/:day", isReceptionist, getAllAppointmentsOnSpecificDay);

module.exports = router;
