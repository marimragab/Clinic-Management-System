const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const doctorSchema = new mongoose.Schema(
  {
    _id: Number,
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      RegExp: [
        "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      RegExp: ["/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/", "i"],
      required: true,
    },
    specialization: { type: String, required: true },
    appointment: [
      {
        type: Number,
        ref: "appointments",
      },
    ],
  },
  { _id: false }
);

doctorSchema.plugin(AutoIncrement, { id: "doctor" });
module.exports = mongoose.model("doctors", doctorSchema);
