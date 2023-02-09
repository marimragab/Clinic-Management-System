const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt=require('bcrypt') 

const addressschema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: Number, required: true },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    fullName: {
      type: String,
      max: 20,
    },
    age: {
      type: Number,
      require: true,
      min: 18,
      max: 60,
    },
    address: {
      type: addressschema,
    },
    roll: {
      type: String,
      required: true,
      enum: ["Admin","receptionist", "Accountant", "pharmaceutical", "nurse"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  },
  { _id: false }
);

schema.pre('save',async function(next) {
  try{
      const salt=await bcrypt.genSalt(10)
      const haspassword= await bcrypt.hash(this.password,salt)
      this.password=haspassword
      next()
  }catch(error){
    next(error)
  }
})
schema.plugin(AutoIncrement,{id:"employee"});

mongoose.model("employees",schema)

