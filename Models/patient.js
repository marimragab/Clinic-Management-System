const mongoose=require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)

const addressSchema = new mongoose.Schema({
    city:{type:String,require:true},

    street:{type:String,require:true},

    building:{type:Number,require:true}

},{_id:false})

const schema = new mongoose.Schema({
    _id:{type:Number},

    fullName:{type:String,max:50,require:true},

    password:{type:String,require:true,RegExp:["/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/", "i"]},

    age:{type:Number,require:true},

    email:{type:String,require:true,unique:true,RegExp:["/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/", "Please enter a valid email address"]},

    address:{type:addressSchema},

    phoneNumber:{type:Number,require:true,/*RegExp:["^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,5}$"]*/},

    paymentMethod:{type:String,enum:["Cash","Credit Card","Insurance Card"]}

},{_id:false})



schema.plugin(AutoIncrement,{id:"patient"});
mongoose.model("patients",schema)