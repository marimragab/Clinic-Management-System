const { body, query, param, validationResult } = require("express-validator");

let postValidation = [
  body("name")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("name should be string"),
  body("price").isInt().withMessage("price should be number"),
];

let patchValidation = [
  body("_id").isInt(),
  body("name").isAlpha("en-US", { ignore: "s" }).optional(),
  body("price").isInt().optional(),
];
module.exports = {
  postValidation: postValidation,
  patchValidation: postValidation,
};
