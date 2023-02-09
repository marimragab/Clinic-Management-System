const stripe = require('stripe')(Secret_Key)
const mongoose=require("mongoose");
const  {body,query,param,validationResult, Result}=require("express-validator");
const { request } = require("express");
const employeeSchema=mongoose.model("payment")

exports.newpayment=(req, res)=>{
 
// Moreover you can take more details from user
// like Address, Name, etc from form
stripe.patient.create({
email: req.body.stripeEmail,
source: req.body.stripeToken,
name: 'Eman',
address: {
line1: 'Dakhlia',
postal_code: '1212',
city: 'Mansoura',
state: 'Mansoura',
country: 'Egypt',
}
})
.then((patient) => {
 
return stripe.charges.create({
amount: 100, 
description: 'Visita',
currency: 'EGP',
patient: patient.id
});
})
.then((charge) => {
res.send("Success") // If no error occurs
})
.catch((err) => {
res.send(err) // If some error occurs
});
}