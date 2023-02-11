const mongoose = require("mongoose");
const Appointment = require("../Models/appointment");
require("./../Models/patient");
const Patient = mongoose.model("patients");
const Doctor = require("../Models/doctor");
const filerResults = require("./../utils/filterAndSort");
const { sendEmail } = require("./../utils/email");

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



const addNewAppointment = async (request, response, next) => {
  let { patient, doctor, date, time, appointmentType ,paymentMethod} = request.body;
  try {
    let isPatient = await Patient.findOne({ _id: patient });
    let isDoctor = await Doctor.findOne({ _id: doctor }).populate({
      path: "appointment",
      select: "date time",
    });
    //! the date of the appointment must be the date of current day if its suitable or the after that
    if (!isPatient) {
      throw new Error("No patient with provided id");
    } else if (!isDoctor) {
      throw new Error("No Doctor with provided id");
    } else if (!isValidDate(date)) {
      throw new Error(
        "Unvalid date, you should provide date after or equal today"
      );
    } else {
      const doctorAppointments = isDoctor.appointment;
      //console.log(doctorAppointments);
      //Get doctor appointments on selected day
      let appointmentsAtSelectedDate = doctorAppointments.filter(
        (appointment) => appointment.date == date
      );
      console.log(appointmentsAtSelectedDate);
      //! If there are appointments on that day, then we check if the time selected available or not
      if (appointmentsAtSelectedDate.length > 0) {
        let unavailableTimes = appointmentsAtSelectedDate.map(
          (appointment) => appointment.time
        );
        // console.log(unavailableTimes);
        // console.log(unavailableTimes.includes(time));
        //!if present appointments times includes the choosed time then user should choose another time
        if (unavailableTimes.includes(time)) {
          throw new Error("Sorry,but you can't book appointment at that time, choose another time");
        } else {
          let newAppointment = new Appointment({
            patient,
            doctor,
            date,
            time,
            appointmentType,
            paymentMethod
          });
          await newAppointment.save();
          isDoctor.appointment.push(newAppointment._id);
          await isDoctor.save();
          sendEmail(
            isDoctor.email,
            "New Appointment Assigned",
            `<h1>Hello ${isDoctor.name},</h1><p>Hope all is well ...</p><p>We send email that email to you to notify you with your new appointment</p><p>Appointment Details are detailed below:</p><h3>Appointment Date: ${newAppointment.date}</h3><h3>Appointment Time: ${newAppointment.time}</h3><h3>Appointment Type: ${newAppointment.appointmentType}</h3>`
          );
          response.status(200).json({
            message: "Appointment added successfully",
            id: newAppointment._id,
          });
        }
      } else {
        //! if there is no appointments at that day,so add the new appointment to the doctor and to the appointment collection
        let newAppointment = new Appointment({
          patient,
          doctor,
          date,
          time,
          appointmentType,
          paymentMethod
        });
        await newAppointment.save();
        isDoctor.appointment.push(newAppointment._id);
        //await Doctor.findOneAndUpdate({_id:doctor},{$push: { appointment:newAppointment._id  }})
        await isDoctor.save();
        sendEmail(
          isDoctor.email,
          "New Appointment Assigned",
          `<h1>Hello ${isDoctor.name},</h1><p>Hope all is well ...</p><p>We send email that email to you to notify you with your new appointment</p><p>Appointment Details are detailed below:</p><h3>Appointment Date: ${newAppointment.date}</h3><h3>Appointment Time: ${newAppointment.time}</h3><h3>Appointment Type: ${newAppointment.appointmentType}</h3>`
        );
        response.status(200).json({
          message: "Appointment added successfully",
          id: newAppointment._id,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

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
  let today = new Date().toISOString().split("T")[0];
  return date >= today;
}

module.exports = {
  getAllAppointments,
  addNewAppointment,
  updateAppointment,
  deleteAppointment,
};
