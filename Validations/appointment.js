const { param, body, query } = require("express-validator");

const addAppointmentValidations = [
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
  body("date")
    .notEmpty()
    .withMessage("Appointment Date is required")
    .isDate()
    .withMessage(
      "Appointment Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
  body("time")
    .notEmpty()
    .withMessage("Appointment Time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Appointment Time must be a valid time on format HH:MM"),
  body("appointmentType")
    .notEmpty()
    .withMessage("Appointment type is required")
    .isIn(["Home-Visit", "On-site"])
    .withMessage("Appointment type must be one of Home-Visit, On-site"),
];

const updateAppointmentValidations = [
  body("id")
    .notEmpty()
    .withMessage("Appointment id is required")
    .isMongoId()
    .withMessage("Appointment id must be objectId"),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isMongoId()
    .withMessage("Doctor id must be objectId")
    .optional(),
  body("date")
    .notEmpty()
    .withMessage("Appointment Date is required")
    .isDate()
    .withMessage(
      "Appointment Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    )
    .optional(),
  body("time")
    .notEmpty()
    .withMessage("Appointment Time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Appointment Time must be a valid time on format HH:MM")
    .optional(),
  body("appointmentType")
    .notEmpty()
    .withMessage("Appointment type is required")
    .isIn(["Home-Visit", "On-site"])
    .withMessage("Appointment type must be one of Home-Visit, On-site")
    .optional(),
];

const deleteAppointmentValidations = [
  body("id")
    .notEmpty()
    .withMessage("Appointment id is required")
    .isMongoId()
    .withMessage("Appointment id must be objectId"),
];

module.exports = {
  addAppointmentValidations,
  updateAppointmentValidations,
  deleteAppointmentValidations,
};
