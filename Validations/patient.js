const { param, body, query } = require("express-validator");

const addPatientValidation = [
    body("fullName").notEmpty().withMessage("Full name is required")
                    .isAlpha("en-US", { ignore: "s - / , ." }).withMessage("Full name should be string")
                    .isLength({max:50}).withMessage("Full name can not exceed 50 letters"),

    body("password").notEmpty().withMessage("Password is required")
                    .isStrongPassword().withMessage("Enter a valid password"),

    body("age").notEmpty().withMessage("Age is required")
               .isInt().withMessage("Age should be a number"),

    body("email").notEmpty().withMessage("Email is required")
                 .isEmail().withMessage("Not a valid email")
                 .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),

    body("address").notEmpty().withMessage("Address is required")
                   .isObject().withMessage("Enter a valid address"),
    
    body("address.city").isAlpha("en-US", { ignore: "s - / , ." }).withMessage(" City should be string"),

    body("address.street").isAlpha("en-US", { ignore: "s - / , ." }).withMessage("Street should be string"),

    body("address.building").isInt().withMessage("Building should be a number"),

    body("phoneNumber").notEmpty().withMessage("Phone number is required")
                       .isInt().withMessage("Phone number can only be numbers")
                       //.matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,5}$/)
                       ,

    body("paymentMethod").isAlpha("en-US", { ignore: "s - / , ." }).withMessage("paymentMethod should be string")
                         .isIn(["Cash","Credit Card","Insurance Card"]).withMessage("paymentMethod should be one of Cash , Credit Card , Insurance Card ")

];


const updatePatientValidation = [
    body("id").isInt().withMessage("Id must be an integer number")
              .notEmpty().withMessage("Id number is required in order to update"),

    body("fullName").isAlpha("en-US", { ignore: "s - / , ." }).withMessage("Full name should be string")
                    .isLength({max:50}).withMessage("Full name can not exceed 50 letters")
                    .optional(),
    
    body("age").isInt().withMessage("Age should be a number")
               .optional(),

    body("email").isEmail().withMessage("Enter a valid email")
                 .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
                 .optional(),

    body("address").isObject().withMessage("Enter a valid address")
                   .optional(),
    
    body("address.city").isAlpha("en-US", { ignore: "s - / , ." }).withMessage(" City should be string").optional(),

    body("address.street").isAlpha("en-US", { ignore: "s - / , ." }).withMessage("Street should be string").optional(),

    body("address.building").isInt().withMessage("Building should be a number").optional(),

    body("phoneNumber").isInt().withMessage("Phone number can only be numbers")
                       .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
                       .optional(),

    body("paymentMethod").isAlpha("en-US", { ignore: "s - / , ." }).withMessage("paymentMethod should be string")
                         .isIn(["Cash","Credit Card","Insurance Card"]).withMessage("paymentMethod should be one of Cash , Credit Card , Insurance Card ")
                         .optional()
];


const deletePatientValidation = [
    body("id").isInt().withMessage("Id must be an integer number")
              .notEmpty().withMessage("Id number is required in order to delte")
];

module.exports = {addPatientValidation,updatePatientValidation,deletePatientValidation}
