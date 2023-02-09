const { param, body, query } = require("express-validator");

const addDoctorValidations = [
  body("name")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("name should be string")
    .isLength({ max: 25 })
    .withMessage("length of name <7"),
  body("specialization")
    .notEmpty()
    .withMessage("Doctor specialization is required"),
  body("email").isAlpha(),
  body("password").isInt(),
  /* body("appointment")
    .notEmpty()
    .withMessage("appointment id is required")
    .isInt()
    .withMessage("appointment id must be number")
    */
];

const updateDoctorValidations = [
  body("_id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isInt()
    .withMessage("doctor id must be number"),
  body("name")
    .isAlpha()
    .withMessage("name should be string")
    .isLength({ max: 7 })
    .withMessage("length of name <7"),
  body("specialization")
    .notEmpty()
    .withMessage("Doctor specialization is required")
    .optional(),
];

const deleteDoctorValidations = [
  body("_id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isInt()
    .withMessage("doctor id must be number"),
];

module.exports = {
  addDoctorValidations,
  updateDoctorValidations,
  deleteDoctorValidations,
};
