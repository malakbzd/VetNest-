const Patient = require("../models/Patient");

// GET
exports.getPatients = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await Patient.find()
        : await Patient.find({ user: req.user._id });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD
exports.addPatient = async (req, res) => {
  try {
    const p = await Patient.create({
      ...req.body,
      user: req.user._id
    });

    res.json(p);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updatePatient = async (req, res) => {
  try {
    const p = await Patient.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(p);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deletePatient = async (req, res) => {
  try {
    await Patient.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};