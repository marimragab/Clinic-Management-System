const mongoose = require("mongoose");
const Invoice = require("../Models/invoice");
require("./../Models/clinicServices");
const ClinicServices = mongoose.model("clinicServices");

const getInvoicesAtSpecificPeriod = async (request, response, next) => {
  console.log(request.query);
  const startDate = request.query.start;
  const endDate = request.query.end;
  console.log(startDate, endDate);
  try {
    const invoices = await Invoice.find(
      {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      null,
      { sort: { date: 1 } }
    );

    response.status(200).json({
      message: "Success",
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

const getInvoicesAtSpecificDay = async (request, response, next) => {
  try {
    let invoicesAtDay = await Invoice.find(
      { date: request.params.day },
      "servedServices medicines total"
    )
      .populate({ path: "servedServices.serviceinfo" })
      .populate({ path: "medicines.medicineInfo" });
    response.status(200).json({
      message: "Success",
      count: invoicesAtDay.length,
      data: invoicesAtDay,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInvoicesAtSpecificPeriod, getInvoicesAtSpecificDay };
