const { request } = require("express");
const mongoose = require("mongoose");
const doctorSchema = require("../Models/doctor");
const filerResults = require("./../utils/filterAndSort");
const bcrypt=require("bcrypt")

const getAllDoctors = (request, response, next) => {
  filerResults(request.query, doctorSchema)
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const addNewDoctor = async(request, response, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt);
  let newDoctor = new doctorSchema({
    _id: mongoose.Types.ObjectId(),
    name: request.body.name,
    specialization: request.body.specialization,
    appointment: request.body.appointment,
    email: request.body.email,
    password:  hashedPassword ,
  });

  newDoctor
    .save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const updateDoctor = (request, response, next) => {
  doctorSchema
    .findOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json(updated);
    })
    .catch((error) => next(error));
};

const deleteDoctor = (request, response, next) => {
  doctorSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("doctor deleted successfully");
    })
    .catch((error) => next(error));
};

module.exports = {
  getAllDoctors,
  addNewDoctor,
  updateDoctor,
  deleteDoctor,
};
