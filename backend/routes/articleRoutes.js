const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articleController");

const auth = require("../middleware/authMiddleware");

router.get("/", getArticles);
router.post("/", auth, createArticle);
router.delete("/:id", auth, deleteArticle);

module.exports = router;