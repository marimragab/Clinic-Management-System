const { request } = require("express");
const mongoose = require("mongoose");
const Medicine = require("../Models/medicine");
const filerResults = require("./../utils/filterAndSort");

const getAllMedicine = (request, response, next) => {
  filerResults(request.query, Medicine)
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const addNewMedicine = (request, response, next) => {
  let newMedicine = new Medicine({
    name: request.body.name,
    amount: request.body.amount,
    price: request.body.price,
    description: request.body.description,
  });
  newMedicine
    .save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

//   const updateMedicine = (request, response, next) => {
//     Appointment.findOne({ _id: request.body.id })
//       .then((appointment) => {
//         response.status(200).json(appointment);
//       })
//       .catch((error) => next(error));
//   };
//   medicin
//   id // name //amount // price // description

const updateMedicine = (request, response, next) => {
  Medicine.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        name: request.body.name,
        amount: request.body.amount,
        price: request.body.price,
        description: request.body.description,
      },
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0) throw new Error("Medicine not found");

      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
const deleteMedicine = (request, response, next) => {
  Medicine.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("Medicine deleted successfully");
    })
    .catch((error) => next(error));
};

module.exports = {
  getAllMedicine,
  addNewMedicine,
  updateMedicine,
  deleteMedicine,
};
