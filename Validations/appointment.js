const { param, body, query } = require("express-validator");

const addAppointmentValidations = [
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
    body("PaymentMethod")
    .isIn(["Cash", "Credit Card"])
    .withMessage("PaymentMethod is required")
];

const updateAppointmentValidations = [
  body("id")
    .notEmpty()
    .withMessage("Appointment id is required")
    .isInt()
    .withMessage("Appointment id must be number"),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number")
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
    body("PaymentMethod")
    .isIn(["Cash", "Credit Card"])
    .withMessage("PaymentMethod is required")
    .optional(),
];

const deleteAppointmentValidations = [
  body("id")
    .notEmpty()
    .withMessage("Appointment id is required")
    .isInt()
    .withMessage("Appointment id must be number"),
];

const getDoctorAppointmentsOnDayValidations = [
  param("doctor")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isInt()
    .withMessage("Doctor id must be number"),
  param("day")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage(
      "Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
];

module.exports = {
  addAppointmentValidations,
  updateAppointmentValidations,
  deleteAppointmentValidations,
  getDoctorAppointmentsOnDayValidations,
};
