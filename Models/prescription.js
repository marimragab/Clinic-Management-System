const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    patient: {
      type: mongoose.Types.ObjectId,
      required: [true, "You Should provide patient data"],
      // ref: "",
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      required: [true, "You Should provide doctor data"],
      // ref: "",
    },
    date: {
      type: String,
      default: Date.now,
      required: [
        true,
        "You Should provide prescription date on yyyy-mm-dd or yyyy/mm/dd format",
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
    medicine: [
      {
        info: {
          type: mongoose.Types.ObjectId,
          ref: "",
          required: [true, "You Should provide medicine data"],
        },
        dose: {
          type: String,
          required: [true, "You Should provide medicine dose "],
        },
      },
    ],
    follow_up: {
      type: String,
      required: [
        true,
        "You Should provide follow up date on yyyy-mm-dd or yyyy/mm/dd format",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("prescriptions", prescriptionSchema);
