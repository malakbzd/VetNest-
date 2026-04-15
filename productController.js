const Product = require("../models/Product");

// GET all
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST create
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};