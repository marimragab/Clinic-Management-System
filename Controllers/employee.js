const mongoose = require("mongoose");
const {
  body,
  query,
  param,
  validationResult,
  Result,
} = require("express-validator");
const { request } = require("express");
require("./../Models/employee");
const employeeSchema = mongoose.model("employees");


exports.getAllEmployees=(request,response,next)=>{
    let query={}
    //filter by fullName
    if(request.query.fullName){
        query.fullName=request.query.fullName
    }
    employeeSchema.find(query)
    .populate('fullName')
    //sort by fullName
    .skip(0)
    .limit(10)
    .sort({fullName : 1})
    .then((data)=>{
        response.status(200).json(data)
    })
    .catch((error) => next(error));
};

exports.addEmployee = (request, response, next) => {
  let newEmployee = new employeeSchema({
    fullName: request.body.fullName,
    address: request.body.address,
    email: request.body.email,
    age: request.body.age,
    roll: request.body.roll,
    password: request.body.password,
  });
  newEmployee
    .save()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};

exports.updateEmployee = (request, response, next) => {
  employeeSchema
    .updateOne(
      {
        _id: request.body._id,
      },
      {
        $set: {
          fullName: request.body.fullName,
          address: request.body.address,
          email: request.body.email,
          age: request.body.age,
          roll: request.body.roll,
          password: request.body.password,
        },
      }
    )
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};

exports.deleteEmployee = (request, response, next) => {
  employeeSchema
    .deleteOne({
      _id: request.body._id,
    })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
}
