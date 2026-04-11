const router = require("express").Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  const update = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
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
const auth = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;