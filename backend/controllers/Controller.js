const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 نشوف واش يجي

    const patient = new Patient(req.body);
    const saved = await patient.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);

    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};