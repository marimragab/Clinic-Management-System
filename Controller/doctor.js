const { request } = require("express");
const mongoose = require("mongoose");
const doctorSchema = require("../Model/doctor");

const getAllDoctors = (request, response, next) => {
    doctorSchema.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const addNewDoctor = (request, response, next) => {
  let newDoctor = new doctorSchema({
    _id: mongoose.Types.ObjectId(),
    name: request.body.name,
    specialization: request.body.specialization,
    appointment: request.body.appointment,
  });
  
  newDoctor.save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const updateDoctor = (request, response, next) => {
    doctorSchema.findOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json(updated);
    })
    .catch((error) => next(error));
};

const deleteDoctor = (request, response, next) => {
doctorSchema.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("doctor deleted successfully");
    })
    .catch((error) => next(error));
};

module.exports = {
  getAllDoctors,
  addNewDoctor,
  updateDoctor,
  deleteDoctor
};
