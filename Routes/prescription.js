const express = require("express");

const {
  addPrescriptionValidations,
  getDoctorPrescriptionOnDayValidations,
  updatePrescriptionValidations,
  deletePrescriptionValidations,
} = require("./../Validations/prescription");

const validator = require("./../Middlewares/validationMW");
const {
  addNewPrescription,
  getAllPrescriptions,
  getSpecificPatientPrescriptions,
  getSpecificPatientPrescriptionsForSpecificDoctor,
  updatePrescription,
} = require("./../Controllers/prescription");

const router = express.Router();

router
  .route("/prescription")
  .get(getAllPrescriptions)
  .post(addPrescriptionValidations, validator, addNewPrescription)
  .patch(updatePrescriptionValidations, validator, updatePrescription);

router.get("/prescription/:patient", getSpecificPatientPrescriptions);
router.get(
  "/prescription/:patient/:doctor",
  getSpecificPatientPrescriptionsForSpecificDoctor
);

module.exports = router;
