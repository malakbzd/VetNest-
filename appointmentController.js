const Appointment = require("../models/Appointment");

// Create appointment (user automatically added)
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get appointments for logged-in user
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate("pet", "name type")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment (only if owned by user)
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete appointment (only if owned by user)
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};