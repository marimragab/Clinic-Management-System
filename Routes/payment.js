const express = require("express");
const router = express.Router();
const controller=require("./../Controllers/payment")
const  {body,query,param,validationResult}=require("express-validator");
const validator=require("./../Middlewares/validationMW")



router.route.post('/payment', controller.newpayment)