const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const prescriptionSchema = new mongoose.Schema(
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
    medicines: [
      {
        info: {
          type: Number,
          ref: "medicines",
          required: [true, "You Should provide medicine data"],
        },
        dose: {
          type: String,
          required: [true, "You Should provide medicine dose "],
        },
        _id: false,
      },
    ],
    followup: {
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
  { timestamps: true },{_id:Number}
);

prescriptionSchema.plugin(AutoIncrement,{id:"prescription"});
module.exports = mongoose.model("prescriptions", prescriptionSchema);
