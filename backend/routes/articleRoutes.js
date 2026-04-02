const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.get("/", getArticles);
router.post("/", auth, createArticle);
router.put("/:id", auth, updateArticle);
router.delete("/:id", auth, deleteArticle);

module.exports = router;