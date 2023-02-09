const mongoose = require("mongoose");
const Prescription = require("../Models/prescription");
const filerResults = require("./../utils/filterAndSort");

const getAllPrescriptions = (request, response, next) => {
  filerResults(request.query, Prescription)
    .then((prescriptions) => {
      response
        .status(200)
        .json({ count: prescriptions.length, data: prescriptions });
    })
    .catch((error) => next(error));
};

const addNewPrescription = (request, response, next) => {
  const { patient, doctor, medicines, followup } = request.body;
  let newPrescription = new Prescription({
    patient,
    doctor,
    medicines,
    followup,
    date: new Date().toISOString().split('T')[0],
  });
  newPrescription
    .save()
    .then((data) => {
      response
        .status(201)
        .json({ message: "Prescription Added", id: data._id });
    })
    .catch((error) => next(error));
};

//! Get specific patient prescriptions (patient want to get fis prescriptions)
const getSpecificPatientPrescriptions = async (request, response, next) => {
  try {
    const { patient } = request.params;
    let patientPrescriptions = await Prescription.find({
      patient,
    });
    response.status(200).json(patientPrescriptions);
  } catch (error) {
    next(error);
  }
};

//! get specific patient prescriptions at specific doctor (doctor want to get specific patient prescription)
const getSpecificPatientPrescriptionsForSpecificDoctor = async (
  request,
  response,
  next
) => {
  try {
    const { patient, doctor } = request.params;
    let patientPrescriptions = await Prescription.find({ patient, doctor });
    response.status(200).json(patientPrescriptions);
  } catch (error) {
    next(error);
  }
};

//! Update prescription (Is not allowed to update doctor or patient, only medicines and follow up date can be updated)
const updatePrescription = (request, response, next) => {};

const deletePrescription = (request, response, next) => {
  Prescription.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("Prescription deleted successfully");
    })
    .catch((error) => next(error));
};
module.exports = {
  getAllPrescriptions,
  addNewPrescription,
  getSpecificPatientPrescriptions,
  getSpecificPatientPrescriptionsForSpecificDoctor,
  updatePrescription,
  deletePrescription
};
