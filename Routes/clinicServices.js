const express=require("express");
const controller=require("./../Controllers/clinicServices")
 const validation=require("./../Validations/clinicServices")
const  {body,query,param,validationResult}=require("express-validator");
const validator=require("./../Middlewares/validationMW")
const router= express.Router();


router.route("/Services")
    .get(controller.getAllServices)
    .post(validation.postValidation, validator ,controller.addServices)
    .patch(validation.patchValidation,controller.updateServices)
    .delete([body("_id").isInt()],controller.deleteServices)
             

module.exports=router;

