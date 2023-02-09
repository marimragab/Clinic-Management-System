const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const appointmentSchema = new mongoose.Schema(
  {
    _id: Number,
    patient: {
      type: Number,
      required: [true, "You Should provide patient data"],
      ref: "patients",
    },
    doctor: {
      type: Number,
      required: [true, "You Should provide doctor data"],
      ref: "doctors",
    },
    date: {
      type: String,
      default: Date.now,
      required: [
        true,
        "You Should provide appointment date on yyyy-mm-dd or yyyy/mm/dd format",
      ],
      validate: {
        validator: function (date) {
          return /^([\d]{4}|[\d]{2})([-\.\/ ])(1[0-2]|0?[1-9])(\2)([1-2][0-9]|3[0-1]|0?[1-9])$/.test(
            date
          );
        },
        message: (props) =>
          `${props.value} is not a valid date format yyyy-mm-dd or yyyy/mm/dd`,
      },
    },
    time: {
      type: String,
      required: [true, "You Should provide appointment time on hh:mm format"],
      validate: {
        validator: function (time) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: (props) => `${props.value} is not a valid time format hh:mm`,
      },
    },
    appointmentType: {
      type: String,
      enum: {
        values: ["Home-Visit", "On-site"],
        message:
          "{VALUE} is not valid,value must be one of Home-Visit, On-site",
      },
      required: [true, "You Should provide appointment type"],
    },
  },
  { timestamps: true },
  { _id: false }
);

appointmentSchema.plugin(AutoIncrement, { id: "appointment" });
module.exports = mongoose.model("appointments", appointmentSchema);
