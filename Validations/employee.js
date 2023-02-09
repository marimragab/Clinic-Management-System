const { body, query, param, validationResult } = require("express-validator");

let postValidation = [
  body("fullName")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("name should be string"),
  body("age").isInt({ min: 18, max: 60 }).withMessage("age should be number"),
  body("address").isObject().withMessage("insert valid address"),
  body("address.city").isAlpha(),
  body("address.street").isAlpha(),
  body("address.building").isInt(),

  body("roll")
    .isIn(["Admin","receptionist", "Accountant", "pharmaceutical", "nurse"])
    .isAlpha()
    .withMessage("Not avaliable roll"),

  body("email").isEmail().withMessage("enter valid email"),
    
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage("please insert valid password"),
];

let patchValidation = [
  body("_id").isInt(),
  body("fullName").isAlpha("en-US", { ignore: "s" }).optional(),
  body("age").isInt({ min: 18, max: 60 }).optional(),
  body("address").isObject().optional(),
  body("address.city").isAlpha().optional(),
  body("address.street").isAlpha().optional(),
  body("address.building").isInt().optional(),
  body("roll")
    .isIn(["Admin","receptionist", "Accountant", "pharmaceutical"])
    .isAlpha()
    .optional(),
  body("email").isEmail().optional(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .optional(),
];
module.exports = {
  postValidation: postValidation,
  patchValidation: postValidation,
};
