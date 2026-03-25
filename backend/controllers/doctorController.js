const Doctor = require("../models/Doctor");

// GET
exports.getDoctors = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await Doctor.find()
        : await Doctor.find({ user: req.user._id });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD
exports.addDoctor = async (req, res) => {
  try {
    if (req.user.role !== "doctor" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doc = await Doctor.create({
      ...req.body,
      user: req.user._id
    });

    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateDoctor = async (req, res) => {
  try {
    const doc = await Doctor.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};