const { param, body, query } = require("express-validator");
const Doctor=require("./../Models/doctor")

const addDoctorValidations = [
  body("name")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("name should be string")
    .isLength({ max: 12 })
    .withMessage("length of name <12")
    .custom(async (value) => {
      const doctor = await Doctor.findOne({
        name: value,
      });
      if (doctor) {
        throw new Error("there is adoctor with entered name");
      }
    }),
  body("specialization")
    .notEmpty()
    .withMessage("Doctor specialization is required"),
  body("email").isEmail().withMessage("enter valid email"),

  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("please insert valid password"),
];

const updateDoctorValidations = [
  body("_id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isMongoId()
    .withMessage("doctor id must be objectId"),
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
    .isMongoId()
    .withMessage("doctor id must be objectId"),
];

module.exports = {
  addDoctorValidations,
  updateDoctorValidations,
  deleteDoctorValidations,
};
