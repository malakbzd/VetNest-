const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const app = await Appointment.create({ ...req.body, user: req.user.id });
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const apps = await Appointment.find({ user: req.user.id }).populate("pet");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const app = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};