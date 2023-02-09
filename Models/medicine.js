const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const medicineSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "You Should provide amount of medicine"],
    },
    price: {
      type: Number,
      required: [true, "You Should provide price of medicine"],
    },
    description: {
      type: String,
      required: [true, "You Should provide description of medicine"],
    },
  }
  // { timestamps: true }
);

medicineSchema.plugin(AutoIncrement, { id: "medicine" });
module.exports = mongoose.model("medicines", medicineSchema);
