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
const {
  isPharmaceutical,
  isDoctor,
  isPatient,
} = require("./../Middlewares/authenticationMW");
router
  .route("/prescription")
  .get(isPharmaceutical, getAllPrescriptions)
  .post(addPrescriptionValidations, validator, isDoctor, addNewPrescription)
  .patch(updatePrescriptionValidations, validator, isDoctor, updatePrescription)
  .delete(
    deletePrescriptionValidations,
    validator,
    isPharmaceutical,
    deletePrescription
  );

router.get(
  "/prescription/:patient",
  getSpecificPatientPrescriptionsValidations,
  validator,
  isPatient,
  getSpecificPatientPrescriptions
);
router.get(
  "/prescription/:patient/:doctor",
  getSpecificPatientPrescriptionsForSpecificDoctorValidations,
  validator,
  isDoctor,
  getSpecificPatientPrescriptionsForSpecificDoctor
);

module.exports = router;
