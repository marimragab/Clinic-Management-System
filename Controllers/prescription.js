const mongoose = require("mongoose");
const Prescription = require("../Models/prescription");
require("./../Models/patient");
const Patient = mongoose.model("patients");
const Doctor = require("./../Models/doctor");

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

//!follow up date must be after prescription date
const addNewPrescription = async (request, response, next) => {
  const { patient, doctor, medicines, followup } = request.body;
  let today = new Date().toISOString().split("T")[0];
  try {
    const isPatient = await Patient.findOne({ _id: patient });
    const isDoctor = await Doctor.findOne({ _id: doctor });
    if (!isPatient) {
      throw new Error("No patient with provided id");
    } else if (!isDoctor) {
      throw new Error("No Doctor with provided id");
    } else if (followup <= today) {
      throw new Error("Follow up date must be after the date of prescription");
    } else {
      let newPrescription = new Prescription({
        patient,
        doctor,
        medicines,
        followup,
        date: today,
      });
      await newPrescription.save();
      response
        .status(201)
        .json({ message: "Prescription Added", id: newPrescription._id });
    }
  } catch (error) {
    next(error);
  }
};

//! Get specific patient prescriptions (patient want to get his prescriptions)
const getSpecificPatientPrescriptions = async (request, response, next) => {
  try {
    const { patient } = request.params;
    let patientPrescriptions = await Prescription.find({
      patient,
    });
    response
      .status(200)
      .json({ count: patientPrescriptions.length, patientPrescriptions });
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
const updatePrescription = async (request, response, next) => {
  try {
    const allowed = ["medicines", "followup", "id"];
    const updatesRequested = Object.keys(request.body);
    console.log(updatesRequested);
    const isValidUpdates = updatesRequested.every((i) => allowed.includes(i));
    console.log(isValidUpdates);
    let today = new Date().toISOString().split("T")[0];
    if (!isValidUpdates) {
      throw new Error(
        "You are only allowed to update medicines anf follow up date"
      );
    } else {
      let prescription = await Prescription.findById(request.body.id);
      console.log(prescription);
      //! i think the medicine info which refers to medicine id must be unique on the array level as no prescription can have the same medicine twice (fix it later)
      if (request.body.medicines) {
        prescription.medicines.push(...request.body.medicines);
      } else if (request.body.followup) {
        if (request.body.followup <= today) {
          throw new Error(
            "Follow up date must be after the date of prescription"
          );
        } else {
          prescription.followup = request.body.followup;
        }
      }
      await prescription.save();
      response.status(200).json({
        message: "Prescription updated successfully",
        updatedPrescription: prescription,
      });
    }
  } catch (error) {
    next(error);
  }
};

//Delete Prescription
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
  deletePrescription,
};
