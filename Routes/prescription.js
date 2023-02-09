const express = require("express");

const {
  addPrescriptionValidations,
  getDoctorPrescriptionOnDayValidations,
  updatePrescriptionValidations,
  deletePrescriptionValidations,
  getSpecificPatientPrescriptionsForSpecificDoctorValidations,
  getSpecificPatientPrescriptionsValidations,
} = require("./../Validations/prescription");

const validator = require("./../Middlewares/validationMW");
const {
  addNewPrescription,
  getAllPrescriptions,
  getSpecificPatientPrescriptions,
  getSpecificPatientPrescriptionsForSpecificDoctor,
  updatePrescription,
  deletePrescription,
} = require("./../Controllers/prescription");

const router = express.Router();

router
  .route("/prescription")
  .get(getAllPrescriptions)
  .post(addPrescriptionValidations, validator, addNewPrescription)
  .patch(updatePrescriptionValidations, validator, updatePrescription)
  .delete(deletePrescriptionValidations, validator, deletePrescription);

router.get(
  "/prescription/:patient",
  getSpecificPatientPrescriptionsValidations,
  validator,
  getSpecificPatientPrescriptions
);
router.get(
  "/prescription/:patient/:doctor",
  getSpecificPatientPrescriptionsForSpecificDoctorValidations,
  validator,
  getSpecificPatientPrescriptionsForSpecificDoctor
);

module.exports = router;
