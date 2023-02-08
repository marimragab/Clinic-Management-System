const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    serviceinfo: {
      type: Number,
      ref: "clinicService",
      required: [true, "You Should provide service"],
    },
    count: {
      type: Number,
      required: [true, "You Should provide service amount"],
    },
  },
  { _id: false }
);

const medicineSchema = new mongoose.Schema({
  medicine: {
    type: Number,
    required: [true, "You Should provide medicine"],
  },
  count: {
    type: Number,
    required: [true, "You Should provide medicine count"],
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    patient: {
      type: mongoose.Types.ObjectId,
      required: [true, "You Should provide patient data"],
      // ref: "",
    },
    employee: {
      type: Number,
      required: [true, "You Should provide employee data"],
      // ref: "",
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
    servedServices: [servicesSchema],
    //! medicines are not required as the patient can take service only
    medicines: [medicineSchema],
    total: {
      type: Number,
      required: [true, "You Should provide total invoice charge"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoices", invoiceSchema);
