const { param, body, query } = require("express-validator");

const addPrescriptionValidations = [
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isMongoId()
    .withMessage("Patient id must be objectId"),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isMongoId()
    .withMessage("Doctor id must be objectId"),
  // body("date")
  //   .notEmpty()
  //   .withMessage("Prescription Date is required")
  //   .isDate()
  //   .withMessage(
  //     "Prescription Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
  //   ),
  body("medicines")
    .notEmpty()
    .withMessage("Prescription medicines array is required")
    .isArray()
    .withMessage("Prescription medicines must be an array"),
  body("medicines.*.info")
    .notEmpty()
    .withMessage("Prescription medicine info  is required")
    .isMongoId()
    .withMessage("Prescription medicine info must be objectId"),
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
    .isMongoId()
    .withMessage("Prescription id must be objectId"),
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isMongoId()
    .withMessage("Patient id must be objectId")
    .optional(),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isMongoId()
    .withMessage("Doctor id must be objectId")
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
    .isMongoId()
    .withMessage("Prescription medicine info must be objectId")
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
    .isMongoId()
    .withMessage("Prescription id must be objectId"),
];

const getDoctorPrescriptionOnDayValidations = [
  param("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isMongoId()
    .withMessage("Doctor id must be objectId"),
  param("day")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage(
      "Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
];

module.exports = {
  addPrescriptionValidations,
  updatePrescriptionValidations,
  deletePrescriptionValidations,
  getDoctorPrescriptionOnDayValidations,
};
