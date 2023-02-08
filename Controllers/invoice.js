const mongoose = require("mongoose");
const Invoice = require("../Models/invoice");
const filerResults = require("./../utils/filterAndSort");

const getAllInvoices = async (request, response, next) => {
  try {
    let allInvoices = await filerResults(request.query, Invoice);
    response.status(200).json({ count: allInvoices.length, data: allInvoices });
  } catch (error) {
    next(error);
  }
};

const addNewInvoice = async (request, response, next) => {
  const { patient, employee, date, servedServices } = request.body;
  let newInvoice = new Invoice({
    _id: mongoose.Types.ObjectId(),
    patient,
    employee,
    date,
    servedServices,
  });
  newInvoice
    .save()
    .then((data) => {
      response.status(201).json({ message: "Invoice Added", id: data._id });
    })
    .catch((error) => next(error));
};

const updateInvoice = async (request, response, next) => {};

module.exports = {
  getAllInvoices,
  addNewInvoice,
  updateInvoice,
};
