const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  const saved = await patient.save();
  res.status(201).json(saved);
};

exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};