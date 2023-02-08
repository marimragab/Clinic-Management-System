const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

// const autoIncrement = require("mongoose-auto-increment");
// autoIncrement.initialize(mongoose.connection);
const medicineSchema = new mongoose.Schema(
    
    {
        _id:{type: Number},
        // id_of_medicine: {
        //     type: mongoose.Types.ObjectId,
        //     required: [true, "You Should provide patient data"],
        //     // ref: "",
        //   },
        name:{type:String,
            // required:
            require: true,
            unique:true
            
 
        },
        amount:{type:Number,
            required: [true, "You Should provide amount of medicine"],

        },
        price:{type:Number,
            required: [true, "You Should provide price of medicine"],

        },
        description:{type:String,
            required: [true, "You Should provide description of medicine"],

        }

    },
    // { timestamps: true }
)

// medicineSchema.plugin(autoIncrement.plugin, {

//     model: "medicine",

//     field: "_id",

//     startAt: 1,

// });


medicineSchema.plugin(AutoIncrement,{id:"medicine"});
module.exports = mongoose.model("medicines", medicineSchema);