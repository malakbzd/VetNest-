const Pet = require("../models/Pet");

exports.createPet = async (req, res) => {
  const pet = await Pet.create(req.body);
  res.json(pet);
};

exports.getPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};