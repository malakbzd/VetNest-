const router = require("express").Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;