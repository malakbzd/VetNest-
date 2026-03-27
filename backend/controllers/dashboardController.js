const Pet = require("../models/Pet");
const Appointment = require("../models/Appointment");
const Product = require("../models/Product");

exports.getDashboard = async (req, res) => {
  const pets = await Pet.countDocuments();
  const appointments = await Appointment.countDocuments();
  const products = await Product.countDocuments();

  res.json({
    pets,
    appointments,
    products,
  });
};