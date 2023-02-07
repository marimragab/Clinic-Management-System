const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    specialization: {type: String, required: true},
    appointment: [{
      type: mongoose.Types.ObjectId,
      ref: "appointment"
    }]
  }
);

module.exports = mongoose.model("doctor", doctorSchema);
