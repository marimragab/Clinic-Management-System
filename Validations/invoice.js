const { param, body, query } = require("express-validator");
const mongoose = require("mongoose");
require("./../Models/patient");
const Patient = mongoose.model("patients");
require("./../Models/employee");
const Employee = mongoose.model("employees");
require("./../Models/clinicServices");
const ClinicServices = mongoose.model("clinicServices");
const Medicine = require("../Models/medicine");

const addInvoiceValidations = [
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isInt()
    .withMessage("Patient id must be number")
    .custom(async (value) => {
      const patient = await Patient.findOne({ _id: value });
      if (!patient) {
        throw new Error("There is no patient with entered id");
      }
    }),
  body("employee")
    .notEmpty()
    .withMessage("Employee id is required")
    .isInt()
    .withMessage("Employee id must be number")
    .custom(async (value) => {
      const employee = await Employee.findOne({ _id: value });
      if (!employee) {
        throw new Error("There is no employee with entered id");
      }
    }),
  body("servedServices")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data"),
  body("servedServices.*.serviceinfo")
    .notEmpty()
    .withMessage("Invoice Serves is required")
    .isInt()
    .withMessage("Service info must be number")
    .custom(async (value) => {
      const service = await ClinicServices.findOne({ _id: value });
      if (!service) {
        throw new Error("There is no service with entered id");
      }
    }),
  body("servedServices.*.count")
    .notEmpty()
    .withMessage("Service count is required")
    .isInt({ min: 1 })
    .withMessage("Service amount must be number"),
  body("medicines")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data")
    .optional(),
  body("medicines.*.medicine")
    .notEmpty()
    .withMessage("Medicine id is required")
    .isInt({ min: 1 })
    .withMessage("Medicine id must be number")
    .custom(async (value) => {
      const medicine = await Medicine.findOne({ _id: value });
      if (!medicine) {
        throw new Error("There is no medicine with entered id");
      }
    })
    .optional(),
  body("medicines.*.count")
    .notEmpty()
    .withMessage("Medicine number is required")
    .isInt()
    .withMessage("Medicine number must be number")
    .optional(),
  //! will calculated from calculating services and medicines
  // body("total")
  //   .notEmpty()
  //   .withMessage("Total invoice charge is required")
  //   .isInt()
  //   .withMessage("Invoice total charge must be number"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment Method is required")
    .isIn(["Cash", "Credit Card", "Insurance Card"])
    .withMessage(
      "Appointment type must be one of Cash, Credit Card,Insurance Card"
    ),
];

const updateInvoiceValidations = [
  body("id")
    .notEmpty()
    .withMessage("Invoice id is required")
    .isInt()
    .withMessage("Invoice id must be number"),
  //!Are we need to update patient or employee data??I think the only case if there is syntax error on data not the patient or employee itself changes
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isInt()
    .withMessage("Patient id must be number")
    .custom(async (value) => {
      const patient = await Patient.findOne({ _id: value });
      if (!patient) {
        throw new Error("There is no patient with entered id");
      }
    })
    .optional(),
  body("employee")
    .notEmpty()
    .withMessage("Employee id is required")
    .isInt()
    .withMessage("Employee id must be number")
    .custom(async (value) => {
      const employee = await Employee.findOne({ _id: value });
      if (!employee) {
        throw new Error("There is no employee with entered id");
      }
    })
    .optional(),
  body("date")
    .notEmpty()
    .withMessage("Invoice Date is required")
    .isDate()
    .withMessage(
      "Invoice Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    )
    .optional(),
  body("servedServices")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data"),
  body("servedServices.*.serviceinfo")
    .notEmpty()
    .withMessage("Invoice Serves is required")
    .isInt()
    .withMessage("Service info must be number")
    .custom(async (value) => {
      const service = await ClinicServices.findOne({ _id: value });
      if (!service) {
        throw new Error("There is no service with entered id");
      }
    })
    .optional(),
  body("servedServices.*.count")
    .notEmpty()
    .withMessage("Service count is required")
    .isInt()
    .withMessage("Service amount must be number")
    .optional(),
  body("medicines")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data")
    .optional(),
  body("medicines.*.medicine")
    .notEmpty()
    .withMessage("Medicine id is required")
    .isInt()
    .withMessage("Medicine id must be number")
    .custom(async (value) => {
      const medicine = await Medicine.findOne({ _id: value });
      if (!medicine) {
        throw new Error("There is no medicine with entered id");
      }
    })
    .optional(),
  body("medicines.*.count")
    .notEmpty()
    .withMessage("Medicine number is required")
    .isInt()
    .withMessage("Medicine number must be number")
    .optional(),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment Method is required")
    .isIn(["Cash", "Credit Card", "Insurance Card"])
    .withMessage(
      "Appointment type must be one of Cash, Credit Card,Insurance Card"
    ),
];

const idParamInvoiceValidations = [
  param("id")
    .notEmpty()
    .withMessage("Invoice id is required")
    .isInt()
    .withMessage("Invoice id must be number"),
];

module.exports = {
  addInvoiceValidations,
  updateInvoiceValidations,
  idParamInvoiceValidations,
};
