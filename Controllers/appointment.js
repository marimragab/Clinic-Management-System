const { request } = require("express");
const mongoose = require("mongoose");
const Appointment = require("../Models/appointment");

//! No need for get all appointment on general, you need:
//? Get specific doctor appointments on specific day or range of dates (doctor only)
//? Get all appointment on specific day for all doctors (receptionist)
const getAllAppointments = (request, response, next) => {
  Appointment.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

//! First check of the patient that tries to create a new appointment is registered on our system or not,if
//! not then we take his all data and register him on our system(front).(authentication ispatient)
//! check if the date and time choosed are available for the doctor choiced, if not then we tells him to choose
//! another appointment
//! When he chooses suitable appointment then we notify the doctor with that new appointment and add that appointment
//! to the doctor array of appointment objects
//! Finally we save the appointment data on the database
const addNewAppointment = (request, response, next) => {
  let newAppointment = new Appointment({
    _id: mongoose.Types.ObjectId(),
    patient: request.body.patient,
    doctor: request.body.doctor,
    date: request.body.date,
    time: request.body.time,
    appointmentType: request.body.appointmentType,
  });
  newAppointment
    .save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

//! update only the specific value user want to update
//! notify the doctor with the update
//! update the doctor appointments array
//! patient only can update his appointment (doctor may can update also ?? discuss with team)
const updateAppointment = (request, response, next) => {
  Appointment.findOne({ _id: request.body.id })
    .then((appointment) => {
      response.status(200).json(appointment);
    })
    .catch((error) => next(error));
};

const deleteAppointment = (request, response, next) => {
  Appointment.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("Appointment deleted successfully");
    })
    .catch((error) => next(error));
};

module.exports = {
  getAllAppointments,
  addNewAppointment,
  updateAppointment,
  deleteAppointment
};
