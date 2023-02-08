//CRUD
const mongoose=require("mongoose");
require("./../Models/patient")
const patientSchema = mongoose.model("patient")

exports.getAllPatients = (request,response,next)=>{
    patientSchema.find()
    .then((data)=>{
        response.status(200).json(data)
    })
    .catch(error=>next(error))
}

exports.addPatient = (request,response,next)=>{
    let newPatient = new patientSchema({
        fullName:request.body.fullName,
        password:request.body.password,
        age:request.body.age,
        email:request.body.email,
        address:request.body.address,
        phoneNumber:request.body.phoneNumber,
        paymentMethod:request.body.paymentMethod
    });
    newPatient.save()
    .then(result=>{
        response.status(201).json(result);
    })
    .catch(error=>next(error))
}

exports.updatePatient = (request,response,next)=>{
    patientSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
                fullName:request.body.fullName,
                password:request.body.password,
                age:request.body.age,
                email:request.body.email,
                address:request.body.address,
                phoneNumber:request.body.phoneNumber,
                paymentMethod:request.body.paymentMethod
        }
    })
    .then(result=>{
         response.status(200).json({message:"Information updated successfully"})

    })
    .catch(error=>next(error))
}

exports.deletaPatient = (request,response,next)=>{
    patientSchema.deleteOne({
        _id:request.body.id
    })
    .then(result=>{
        response.status(200).json({message:"Information deleted successfully"})

   })
   .catch(error=>next(error))
    
}