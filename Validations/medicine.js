const { param, body, query } = require("express-validator");
const addMedicineValidations = [
  body("name").notEmpty().withMessage("medicine name is required"),

  body("amount")
    .notEmpty()
    .withMessage("amout of medicine is required")
    .isInt({ min: 200, max: 1000 })
    .withMessage("amout of medicine must be between 200 and 1000"),
  body("price")
    .notEmpty()
    .withMessage("price of medicine is required")
    .isInt()
    .withMessage("price of medicine must be number"),
  body("description")
    .notEmpty()
    .withMessage("description of medicine is required")
    .isString()
    .withMessage("description of medicine must be decleared"),
];
const updateMedicineValidations = [
  body("name")
    .notEmpty()
    .withMessage("medicine name is required")
    .isAlpha()
    .withMessage("medicine name must be string"),
  body("amount")
    .notEmpty()
    .withMessage("amout of medicine is required")
    .isInt({ min: 200, max: 1000 })
    .withMessage("amout of medicine must be between 200 and 1000")
    .optional(),
  body("price")
    .notEmpty()
    .withMessage("price of medicine is required")
    .isFloat()
    .withMessage("price of medicine must be number")
    .optional(),
  body("description")
    .notEmpty()
    .withMessage("description of medicine is required")
    .optional(),
  //   .isAlpha()
  //   .withMessage("description of medicine must be decleared"),
];
const deleteMedicineValidations = [
  body("id")
    .notEmpty()
    .withMessage("Medicine id is required")
    .isInt()
    .withMessage("Medicine id must be integer number"),
];
module.exports = {
  addMedicineValidations,
  updateMedicineValidations,
  deleteMedicineValidations,
};
