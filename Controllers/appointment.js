const mongoose = require("mongoose");
const Appointment = require("../Models/appointment");
// const Patient = require("../Models/patient");
// const Doctor = require("../Models/doctor");
const filerResults = require("./../utils/filterAndSort");
const { sendEmail } = require("./../utils/email");

//! No need for get all appointment on general, you need:
//? Get specific doctor appointments on specific day (doctor only,admin)
//? Get all appointment on specific day for all doctors (receptionist)
const getAllAppointments = async (request, response, next) => {
  console.log(request.query);
  try {
    let allAppointments = await filerResults(request.query, Appointment);
    response
      .status(200)
      .json({ count: allAppointments.length, data: allAppointments });
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
    // if (doctorAppointments)
    response.status(200).json(doctorAppointments);
    // else
    //   response
    //     .status(200)
    //     .json({ message: "This doctor has no appointments on that day" });
  } catch (error) {
    next(error);
  }
};

const getAllAppointmentsOnSpecificDay = async (request, response, next) => {
  console.log(request.params.date);
  let { date } = request.query;
  // console.log(date.query("/", "-"));
  try {
    let allAppointmentsOnDay = await Appointment.find({
      date: request.query.date,
    });
    response.status(200).json(allAppointmentsOnDay);
  } catch (error) {
    next(error);
  }
};

//! First check of the patient that tries to create a new appointment is registered on our system or not,if
//! not then we take his all data and register him on our system(front).(authentication ispatient)
//! check if the date and time choosed are available for the doctor choiced, if not then we tells him to choose
//! another appointment
//! When he chooses suitable appointment then we notify the doctor with that new appointment and add that appointment
//! to the doctor array of appointment objects
//! Finally we save the appointment data on the database
const addNewAppointment = async (request, response, next) => {
  let { patient, doctor, date, time, appointmentType } = request.body;
  // let isPatient = await Patient.findOne({ _id: patient });
  // let isDoctor = await Doctor.findOne({ _id: doctor });
  //! the date of the appointment must be the date of current day if its suitable or the after that
  // if (!isValidDate(date)) {
  //   let error = new Error(
  //     "Unvalid date, you should provide date after or equal today"
  //   );
  //   next(error);
  // } else {
  let newAppointment = new Appointment({
    _id: mongoose.Types.ObjectId(),
    patient,
    doctor,
    date,
    time,
    appointmentType,
    paymentMethod
  });
  newAppointment
  //if(newAppointment.paymentMethod ='credit card')
      //open("/Controllers/payment.js")
    .save()
    .then((data) => {
      sendEmail(
        "mariamragab01@gmail.com",
        "New Appointment Assigned",
        "<h1>Hello Mariam</h1>"
      );
      response.status(200).json(data);
    })
    .catch((error) => next(error));
  // }
};

//! update only the specific value user want to update
//! notify the doctor with the update
//! update the doctor appointments array
//! if the patient updated the doctor, then:
//* notify the old doctor that the patient cancelled the appointment (delete the appointment from doctor's appointments array)
//* add the appointment to the new doctor and notify him
//! patient only can update his appointment (doctor may can update also ?? discuss with team)
const updateAppointment = async (request, response, next) => {
  const userUpdatesKeys = Object.keys(request.body);
  console.log(userUpdatesKeys);
  const notValidUpdate = userUpdatesKeys.includes("patient");

  if (notValidUpdate) {
    let error = new Error(
      "Unvalid requested updates, you can't update patient data"
    );
    next(error);
  } else {
    let userUpdates = request.body;
    try {
      let appointment = await Appointment.findOne({ _id: request.body.id });
      //!before update check that date and time are available (create generic function as you need it on create also)
      for (const key in userUpdates) {
        if (key == "date") {
          if (!isValidDate(userUpdates[key])) {
            let error = new Error(
              "Unvalid date, you should provide date after or equal today"
            );
            next(error);
          }
        } else appointment[key] = userUpdates[key];
      }
      await appointment.save();
      response
        .status(200)
        .json({ message: "Appointment updated successfully ....." });
    } catch (error) {
      next(error);
    }
  }
};

const deleteAppointment = (request, response, next) => {
  Appointment.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json("Appointment deleted successfully");
    })
    .catch((error) => next(error));
};

function isValidDate(date) {
  let today = new Date()
    .toLocaleDateString()
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-");
  return date >= today;
}

module.exports = {
  getAllAppointments,
  getSpecificDoctorAppointmentsOnDay,
  getAllAppointmentsOnSpecificDay,
  addNewAppointment,
  updateAppointment,
  deleteAppointment,
};
