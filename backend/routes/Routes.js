const express = require("express");
const router = express.Router();
const {
  getPatients,
  createPatient,
  deletePatient,
} = require("../controllers/Controller");

router.get("/", getPatients);
router.post("/", createPatient);
router.delete("/:id", deletePatient);

module.exports = router;