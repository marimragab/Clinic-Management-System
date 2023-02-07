const { param, body, query } = require("express-validator");

const addDoctorValidations = [
  /*const car = await Car.find(
    req.body.name,
  
    req.body
  );
  if (!car) {
    return res.status(404).json({
      success: false,
      message: "Duplicate value.",
    });
  }
  res.status(200).json({
    success: true,
    message: "New car updated successfully",
  });*/
  body("name")
  .isAlpha().withMessage("name should be string").isLength({max:7}).withMessage("length of name <7"),
    
  body("specialization")
    .notEmpty()
    .withMessage("Doctor specialization is required")
];

const updateDoctorValidations = [
  body("_id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isMongoId()
    .withMessage("doctor id must be objectId")


];

const deleteDoctorValidations = [

];

module.exports = {
  addDoctorValidations,
  updateDoctorValidations,
  deleteDoctorValidations,
};
