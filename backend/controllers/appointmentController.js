const Appointment = require("../models/Appointment");

// CREATE
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      user: req.user.id,   // ← fixed: use req.user.id
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET (user specific)
exports.getAppointments = async (req, res) => {
  try {
   let appointments;

if (req.user.role === "admin") {
  appointments = await Appointment.find()
    .populate("pet user");
} else {
  appointments = await Appointment.find({ user: req.user.id })
    .populate("pet user");
}
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateAppointment = async (req, res) => {
  try {
    let filter;
    if (req.user.role === "admin") {
      filter = { _id: req.params.id };
    } else {
      filter = { _id: req.params.id, user: req.user.id };
    }
    const appointment = await Appointment.findOneAndUpdate(filter, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  try {
    let filter;
    if (req.user.role === "admin") {
      filter = { _id: req.params.id };
    } else {
      filter = { _id: req.params.id, user: req.user.id };
    }
    const deleted = await Appointment.findOneAndDelete(filter);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};