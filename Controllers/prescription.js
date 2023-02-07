const mongoose = require("mongoose");
const Prescription = require("../Models/prescription");

//! No need for get all appointment on general, you need:
//? Get specific doctor appointments on specific day (doctor only,admin)
//? Get all appointment on specific day for all doctors (receptionist)
const getAllPrescriptions = (request, response, next) => {
  Prescription.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const addNewPrescription = (request, response, next) => {
  const { patient, doctor, medicines, followup } = request.body;
  let newPrescription = new Prescription({
    _id: mongoose.Types.ObjectId(),
    patient,
    doctor,
    medicines,
    followup,
    date: new Date()
      .toLocaleDateString()
      .replaceAll("/", "-")
      .split("-")
      .reverse()
      .join("-"),
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

module.exports = {
  getAllPrescriptions,
  addNewPrescription,
  getSpecificPatientPrescriptions,
  getSpecificPatientPrescriptionsForSpecificDoctor,
  updatePrescription,
};
