const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  const app = await Appointment.create(req.body);
  res.json(app);
};

exports.getAppointments = async (req, res) => {
  const status = req.query.status;
  const apps = await Appointment.find(status ? { status } : {}).populate("pet");
  res.json(apps);
};

exports.updateAppointment = async (req, res) => {
  const app = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(app);
};

exports.deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};