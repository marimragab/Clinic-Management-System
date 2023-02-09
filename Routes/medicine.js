const express = require ("express");
const {
    getAllMedicine,
    addNewMedicine,
    updateMedicine,
     deleteMedicine,
  } = require("../Controllers/medicine");
  const validator = require("./../Middlewares/validationMW");
  const {
    addMedicineValidations,
    updateMedicineValidations,
     deleteMedicineValidations,
  } = require("./../Validations/medicine");
  
  const router = express.Router();
  const {
    isPharmaceutical,
  } = require("./../Middlewares/authenticationMW");

  router
    .route("/medicine")
    .all(isPharmaceutical)
    .get(getAllMedicine)
    .post(addMedicineValidations, validator, addNewMedicine)
    .patch(updateMedicineValidations, validator, updateMedicine)
    .delete(deleteMedicineValidations, validator, deleteMedicine);
  
  module.exports = router;