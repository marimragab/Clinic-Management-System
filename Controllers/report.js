const Invoice = require("../Models/invoice");
const Appointment = require("../Models/appointment");

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

const getSpecificDoctorAppointmentsOnDay = async (request, response, next) => {
  try {
    const { doctor, day } = request.params;
    let doctorAppointments = await Appointment.find({
      doctor,
      date: day,
    });
    response
      .status(200)
      .json({ count: doctorAppointments.length, doctorAppointments });
  } catch (error) {
    next(error);
  }
};

//! validation on date needed here
const getAllAppointmentsOnSpecificDay = async (request, response, next) => {
  let { day } = request.params;
  try {
    let allAppointmentsOnDay = await Appointment.find({
      date: day,
    });
    response
      .status(200)
      .json({ day, "All Appointments": allAppointmentsOnDay });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoicesAtSpecificPeriod,
  getInvoicesAtSpecificDay,
  getAllAppointmentsOnSpecificDay,
  getSpecificDoctorAppointmentsOnDay,
};
