const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST
router.post("/", upload.single("image"), async (req, res) => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file ? req.file.filename : "",
  });

  res.json(product);
});

// PUT
router.put("/:id", upload.single("image"), async (req, res) => {
  const update = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  if (req.file) {
    update.image = req.file.filename;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  );

  res.json(product);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;