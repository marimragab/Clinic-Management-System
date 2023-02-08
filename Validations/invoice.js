const { param, body, query } = require("express-validator");

const addInvoiceValidations = [
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isMongoId()
    .withMessage("Patient id must be objectId"),
  body("employee")
    .notEmpty()
    .withMessage("Employee id is required")
    .isInt()
    .withMessage("Employee id must be number"),
  body("date")
    .notEmpty()
    .withMessage("Invoice Date is required")
    .isDate()
    .withMessage(
      "Invoice Date must be a valid date on format YYYY/MM/DD or YYYY-MM-DD"
    ),
  body("servedServices")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data"),
  body("servedServices.*.info")
    .notEmpty()
    .withMessage("Invoice Serves is required")
    .isInt()
    .withMessage("Service info must be number"),
  body("servedServices.*.amount")
    .notEmpty()
    .withMessage("Invoice amount is required")
    .isInt()
    .withMessage("Service amount must be number"),
];

const updateInvoiceValidations = [
  body("id")
    .notEmpty()
    .withMessage("Invoice id is required")
    .isMongoId()
    .withMessage("Invoice id must be objectId"),
  body("patient")
    .notEmpty()
    .withMessage("Patient id is required")
    .isMongoId()
    .withMessage("Patient id must be objectId")
    .optional(),
  body("employee")
    .notEmpty()
    .withMessage("Employee id is required")
    .isInt()
    .withMessage("Employee id must be number")
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
  body("servedServices.*.info")
    .notEmpty()
    .withMessage("Invoice Serves is required")
    .isInt()
    .withMessage("Service info must be number")
    .optional(),
  body("servedServices.*.count")
    .notEmpty()
    .withMessage("Invoice amount is required")
    .isInt()
    .withMessage("Service amount must be number")
    .optional(),
  body("medicines")
    .notEmpty()
    .withMessage("Invoice Services is required")
    .isArray()
    .withMessage("Invoice Service must be array")
    .isLength({ min: 1 })
    .withMessage("Served Services must contain at least one service data"),
  body("servedServices.*.info")
    .notEmpty()
    .withMessage("Invoice Serves is required")
    .isInt()
    .withMessage("Service info must be number")
    .optional(),
];

const deleteInvoiceValidations = [
  param("id")
    .notEmpty()
    .withMessage("Invoice id is required")
    .isMongoId()
    .withMessage("Invoice id must be objectId"),
];

module.exports = {
  addInvoiceValidations,
  updateInvoiceValidations,
  deleteInvoiceValidations,
};
