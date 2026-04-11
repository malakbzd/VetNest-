const Appointment = require("../models/Appointment");

// CREATE
exports.createAppointment = async (req, res) => {
  try {
    const app = await Appointment.create({
      ...req.body,
     user: req.body.user || req.user._id
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET
exports.getAppointments = async (req, res) => {
  try {
    let apps;

    if (req.user.role === "admin") {
      apps = await Appointment.find().populate("pet user");
    } else {
      apps = await Appointment.find({ user: req.user._id }).populate("pet");
    }

    res.json(apps);
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
      filter = { _id: req.params.id, user: req.user._id };
    }

    const app = await Appointment.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    res.json(app);
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
      filter = { _id: req.params.id, user: req.user._id };
    }

    await Appointment.findOneAndDelete(filter);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};