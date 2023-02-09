const mongoose = require("mongoose");
const Invoice = require("../Models/invoice");
require("./../Models/clinicServices");
const ClinicServices = mongoose.model("clinicServices");
const Medicine = require("../Models/medicine");
const filerResults = require("./../utils/filterAndSort");

const getAllInvoices = async (request, response, next) => {
  try {
    let allInvoices = await filerResults(request.query, Invoice);
    response.status(200).json({ count: allInvoices.length, data: allInvoices });
  } catch (error) {
    next(error);
  }
};

const getSpecificInvoice = async (request, response, next) => {
  try {
    let invoice = await Invoice.findById({ _id: request.params.id });
    if (!invoice) throw new Error("No Invoice With provided id");
    else response.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

const addNewInvoice = async (request, response, next) => {
  try {
    const { patient, employee, servedServices, medicines, paymentMethod } =
      request.body;

    let total = 0;
    let allClinicServices = await ClinicServices.find();
    let allClinicMedicines = await Medicine.find({}, { price: 1, amount: 1 });

    console.log(allClinicServices);
    console.log(allClinicMedicines);

    servedServices.forEach((service) => {
      let serviceData = allClinicServices.find(
        (servicedata) => servicedata._id == service.serviceinfo
      );
      console.log("service", serviceData);
      console.log(serviceData.price * service.count);
      service.totalCharge = serviceData.price * service.count;
      console.log("service", serviceData);
      total += Number(serviceData.price) * Number(service.count);
    });

    if (medicines) {
      medicines.forEach((medicine) => {
        let medicineData = allClinicMedicines.find(
          (medicinedata) => medicinedata._id == medicine.medicineInfo
        );
        console.log("medicine", medicineData);
        medicine.totalCharge = medicineData.price * medicine.count;
        console.log(medicineData.price * medicine.count);
        total += Number(medicineData.price) * Number(medicine.count);
      });
    }

    console.log(servedServices);
    console.log(medicines);
    console.log(total);
    let newInvoice = new Invoice({
      patient,
      employee,
      servedServices,
      medicines,
      paymentMethod,
      total,
      date: new Date().toISOString().split("T")[0],
      time: new Date()
        .toTimeString()
        .split(" ")[0]
        .split(":")
        .splice(0, 2)
        .join(":"),
    });
    await newInvoice.save();
    response.status(201).json({ message: "Invoice Added", id: newInvoice._id });
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (request, response, next) => {
  try {
    await Invoice.findByIdAndRemove({ _id: request.params.id });
    response.status(200).json({ message: "deleted", id: request.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInvoices,
  getSpecificInvoice,
  addNewInvoice,
  deleteInvoice 
};
