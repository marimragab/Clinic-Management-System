const { param, body, query } = require("express-validator");
const mongoose=require('mongoose')
const Medicine = require("./../Models/medicine");
const Doctor = require("./../Models/doctor");
require("./../Models/patient");
const Patient = mongoose.model("patients");

const addPrescriptionValidations = [
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isInt()
    .withMessage("Patient id must be number"),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number"),
  body("medicines")
    .notEmpty()
    .withMessage("Prescription medicines array is required")
    .isArray()
    .withMessage("Prescription medicines must be an array")
    .isLength({ min: 1 })
    .withMessage("Medicines must contain at least one medicine data"),
  body("medicines.*.info")
    .notEmpty()
    .withMessage("Prescription medicine info  is required")
    .isInt()
    .withMessage("Prescription medicine info must be number")
    .custom(async (value) => {
      const medicine = await Medicine.findOne({ _id: value });
      if (!medicine) {
        throw new Error("There is no medicine with entered id");
      }
    }),
  body("medicines.*.dose")
    .notEmpty()
    .withMessage("Prescription medicine dose is required")
    .isAlphanumeric("en-US", { ignore: "s - / , ." }),
  body("followup")
    .notEmpty()
    .withMessage("Prescription follow-up date is required")
    .isDate()
    .withMessage(
      "Prescription follow-up date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
];

//! Are we required to update doctor or patient data after saving a prescription? (I think this will be needed if there is only a syntax error.)
const updatePrescriptionValidations = [
  body("id")
    .notEmpty()
    .withMessage("Prescription id is required")
    .isInt()
    .withMessage("Prescription id must be number"),
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isInt()
    .withMessage("Patient id must be number")
    .optional(),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
    .optional(),
  body("medicines")
    .notEmpty()
    .withMessage("Prescription medicines array is required")
    .isArray()
    .withMessage("Prescription medicines must be an array")
    .optional(),
  body("medicines.*.info")
    .notEmpty()
    .withMessage("Prescription medicine info  is required")
    .isInt()
    .withMessage("Prescription medicine info must be number")
    .custom(async (value) => {
      const medicine = await Medicine.findOne({ _id: value });
      if (!medicine) {
        throw new Error("There is no medicine with entered id");
      }
    })
    .optional(),
  body("medicines.*.dose")
    .notEmpty()
    .withMessage("Prescription medicine dose is required")
    .isAlphanumeric("en-US", { ignore: "s - / , ." })
    .optional(),
  body("followup")
    .notEmpty()
    .withMessage("Prescription follow-up date is required")
    .isDate()
    .withMessage(
      "Prescription follow-up date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    )
    .optional(),
];

const deletePrescriptionValidations = [
  body("id")
    .notEmpty()
    .withMessage("Prescription id is required")
    .isInt()
    .withMessage("Prescription id must be number"),
];

const getDoctorPrescriptionOnDayValidations = [
  param("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
    .custom(async (value) => {
      const doctor = await Doctor.findOne({ _id: value });
      if (!doctor) {
        throw new Error("There is no doctor with provided id");
      }
    }),
  param("day")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage(
      "Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
];


const getSpecificPatientPrescriptionsValidations = [
  param("patient")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
    .custom(async (value) => {
      const ispatient = await Patient.findOne({ _id: value });
      if (!ispatient) {
        throw new Error("There is no patient with provided id");
      }
    })
]

const getSpecificPatientPrescriptionsForSpecificDoctorValidations = [
  param("patient")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
    .custom(async (value) => {
      const ispatient = await Patient.findOne({ _id: value });
      if (!ispatient) {
        throw new Error("There is no patient with provided id");
      }
    }),
  param("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
    .custom(async (value) => {
      const isdoctor = await Doctor.findOne({ _id: value });
      if (!isdoctor) {
        throw new Error("There is no doctor with provided id");
      }
    }),
];

module.exports = {
  addPrescriptionValidations,
  updatePrescriptionValidations,
  deletePrescriptionValidations,
  getDoctorPrescriptionOnDayValidations,
  getSpecificPatientPrescriptionsForSpecificDoctorValidations,
  getSpecificPatientPrescriptionsValidations
};
