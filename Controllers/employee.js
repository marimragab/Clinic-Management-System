
const mongoose=require("mongoose");
const  {body,query,param,validationResult, Result}=require("express-validator");
const { request } = require("express");
 require("./../Models/employee")
const employeeSchema=mongoose.model("employee")

exports.getAllEmployees=(request,response,next)=>{
    employeeSchema.find()
    .then((data)=>{
        response.status(200).json(data)
    })
    .catch(error=>next(error))
} 

// add new teacher with status 201
exports.addEmployee=(request,response,next)=>{
    let newEmployee=new employeeSchema({
        fullName:request.body.fullName,
        address:request.body.address,
        email:request.body.email,
        age:request.body.age,
        roll:request.body.roll
    });
    newEmployee.save()
    .then(result=>{
        response.status(200).json(result)      
    })
    .catch(error=>next(error))          
}
  

// update teacher 
exports.updateEmployee=(request,response,next)=>{
        employeeSchema.updateOne({
            _id:request.body._id    //get id
},{
    $set:{fullName:request.body.fullName,
            address:request.body.address,
            email:request.body.email,
            age:request.body.age,
            roll:request.body.roll}, 
}).then(result=>{
    response.status(200).json(result)       //succedd
})
.catch(error=>next(error))          //error
}

// delete teacher 
exports.deleteEmployee=(request,response,next)=>{
    employeeSchema.deleteOne({
        _id:request.body._id    //get id
})
.then(result=>{
    response.status(200).json(result)       //succedd
})
.catch(error=>next(error))          //error
}

//get one teacher by Id
exports.getEmployeeByID=(request,response,next)=>{

    employeeSchema.findOne({_id:request.params.id})
    .then(data=>{
        if(data != null)             //mean found data so return data
            response.status(200).json(data)
           
        else
        {
            next(new Error("not exist"))
        }
    })
}



