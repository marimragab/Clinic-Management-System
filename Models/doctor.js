const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const doctorSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {type: String, required: true,unique:true},
    email:{type:String},
    password:{type:Number},
    specialization: {type: String, required: true},
    appointment: [{
      type: Number,
      ref: "appointments"
    }]
  },{_id:false}
);

doctorSchema.plugin(AutoIncrement, { id: "doctor" });
module.exports = mongoose.model("doctors", doctorSchema);
