const mongoose=require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)


const schema=new mongoose.Schema({
    _id:{
        type:Number
    },
    name:{
        type:String,
        unique:true,
        max:20
    },
    price:{
        type:Number,
        require:true,
    }

},{ _id: false })

schema.plugin(AutoIncrement,{id:"clinicServices"});

mongoose.model("clinicServices",schema)





