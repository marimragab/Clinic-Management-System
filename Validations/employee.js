const  {body,query,param,validationResult}=require("express-validator");


let postValidation= [
    body("fullName").isAlpha().withMessage("name should be string"),
    body("age").isInt({ min: 18, max: 60 }).withMessage("age should be number"),
    body("address").isObject(),
    body("address.city").isAlpha(),
    body("address.street").isAlpha(),
    body("address.building").isInt(), 
    body("roll").isIn(["receptionist",'Accountant','pharmaceutical','nurse']).isAlpha().withMessage("Not avaliable roll"),
    body("email").isEmail().withMessage("enter valid email") 
]


let patchValidation= [body("_id").isInt(),
        body("fullName").isAlpha().optional(),
        body("age").isInt({ min: 18, max: 60 }).optional(),
        body("address").isObject().optional(),
        body("address.city").isAlpha().optional(),
        body("address.street").isAlpha().optional(),
        body("address.building").isInt().optional(), 
        body("roll").isIn(["receptionist",'Accountant','pharmaceutical']).isAlpha().optional(),
        body("email").isEmail().optional()  
                ]
    module.exports={
        postValidation:postValidation,
        patchValidation:postValidation
    }
   