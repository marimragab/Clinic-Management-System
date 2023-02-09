const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const servicesSchema = new mongoose.Schema(
  {
    serviceinfo: {
      type: Number,
      ref: "clinicServices",
      required: [true, "You Should provide service"],
    },
    count: {
      type: Number,
      required: [true, "You Should provide service amount"],
    },
    totalCharge: Number,
  },
  { _id: false }
);

const medicineSchema = new mongoose.Schema(
  {
    medicineInfo: {
      type: Number,
      ref: "medicines",
      // required: [true, "You Should provide medicine"],
    },
    count: {
      type: Number,
      // required: [true, "You Should provide medicine count"],
    },
    totalCharge: Number,
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    _id: Number,
    patient: {
      type: Number,
      required: [true, "You Should provide patient data"],
      ref: "patient",
    },
    employee: {
      type: Number,
      required: [true, "You Should provide employee data"],
      ref: "employee",
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
    servedServices: [servicesSchema],
    //! medicines are not required as the patient can take service only
    medicines: [medicineSchema],
    total: {
      type: Number,
      required: [true, "You Should provide total invoice charge"],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["Cash", "Credit Card", "Insurance Card"],
        message:
          "{VALUE} is not valid,value must be one of Cash, Credit Card,Insurance Card",
      },
      required: [true, "You Should provide payment method"],
    },
  },
  { timestamps: true },
  { _id: false }
);

invoiceSchema.plugin(AutoIncrement, { id: "invoice" });
module.exports = mongoose.model("invoices", invoiceSchema);
