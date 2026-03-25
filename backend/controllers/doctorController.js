const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
};

exports.addDoctor = async (req, res) => {
  const doc = await Doctor.create(req.body);
  res.json(doc);
};

exports.updateDoctor = async (req, res) => {
  const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

exports.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};