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
    let apps;

    if (req.user.role === "admin") {
      // Admin sees ALL appointments
      apps = await Appointment.find().populate("pet user");
    } else {
      // Normal user sees only their own
      apps = await Appointment.find({ user: req.user.id }).populate("pet");
    }

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      // Admin can update any appointment
      filter = { _id: req.params.id };
    } else {
      // User can only update their own
      filter = { _id: req.params.id, user: req.user.id };
    }

    const app = await Appointment.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      // Admin can delete any appointment
      filter = { _id: req.params.id };
    } else {
      // User can only delete their own
      filter = { _id: req.params.id, user: req.user.id };
    }

    await Appointment.findOneAndDelete(filter);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};