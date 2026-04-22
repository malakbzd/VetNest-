const Pet = require("../models/Pet");

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create({ ...req.body, owner: req.user.id });
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPets = async (req, res) => {
  try {
    let pets;

    if (req.user.role === "admin") {
      // ✅ Admin sees ALL pets + owner info
      pets = await Pet.find().populate("owner", "name email");
    } else {
      // ✅ Normal user sees only their pets
      pets = await Pet.find({ owner: req.user.id });
    }

    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updatePet = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      filter = { _id: req.params.id };
    } else {
      filter = { _id: req.params.id, owner: req.user.id };
    }

    const pet = await Pet.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json(pet);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.deletePet = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      filter = { _id: req.params.id };
    } else {
      filter = { _id: req.params.id, owner: req.user.id };
    }

    const pet = await Pet.findOneAndDelete(filter);

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};