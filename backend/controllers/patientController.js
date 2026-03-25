const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

exports.addPatient = async (req, res) => {
  const p = await Patient.create(req.body);
  res.json(p);
};

exports.updatePatient = async (req, res) => {
  const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
};

exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};