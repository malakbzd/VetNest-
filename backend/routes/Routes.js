const express = require("express");
const router = express.Router();
const {
  getPatients,
  createPatient,
  deletePatient,
  updatePatient
} = require("../controllers/Controller");

router.get("/", getPatients);
router.post("/", createPatient);
router.delete("/:id", deletePatient);
router.put("/:id", updatePatient);
console.log("ROUTES WORKING");
module.exports = router;